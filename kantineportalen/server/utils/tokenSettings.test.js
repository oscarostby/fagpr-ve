import assert from 'node:assert/strict'
import { afterEach, beforeEach, describe, it } from 'node:test'

import jwt from 'jsonwebtoken'

import { AppSetting } from '../models/AppSetting.js'
import { createToken } from './jwt.js'
import {
  clearTokenExpiresInSecondsCache,
  defaultTokenExpiresInSeconds,
  ensureTokenExpiresInSecondsDefault,
  getTokenExpiresInSeconds,
  maxTokenExpiresInSeconds,
  minTokenExpiresInSeconds,
  parseTokenExpiresInSeconds,
  tokenExpirationSettingKey,
} from './tokenSettings.js'

const originalMethods = {
  create: AppSetting.create,
  findOne: AppSetting.findOne,
  findOneAndUpdate: AppSetting.findOneAndUpdate,
}

function leanResult(value) {
  return {
    lean: () => Promise.resolve(value),
  }
}

function restoreAppSetting() {
  AppSetting.create = originalMethods.create
  AppSetting.findOne = originalMethods.findOne
  AppSetting.findOneAndUpdate = originalMethods.findOneAndUpdate
}

describe('tokenSettings', () => {
  beforeEach(() => {
    clearTokenExpiresInSecondsCache()
    restoreAppSetting()
  })

  afterEach(() => {
    clearTokenExpiresInSecondsCache()
    restoreAppSetting()
    delete process.env.JWT_SECRET
  })

  it('returns default token expiration when MongoDB setting is missing', async () => {
    AppSetting.findOne = () => leanResult(null)

    const expiresInSeconds = await getTokenExpiresInSeconds()

    assert.equal(expiresInSeconds, defaultTokenExpiresInSeconds)
  })

  it('returns valid MongoDB token expiration setting', async () => {
    AppSetting.findOne = () => leanResult({ key: tokenExpirationSettingKey, value: 3600 })

    const expiresInSeconds = await getTokenExpiresInSeconds()

    assert.equal(expiresInSeconds, 3600)
  })

  it('logs and falls back to default when existing MongoDB setting is invalid', async () => {
    const warnings = []
    const originalWarn = console.warn
    console.warn = (message) => warnings.push(String(message))
    AppSetting.findOne = () => leanResult({ key: tokenExpirationSettingKey, value: 'abc' })

    try {
      const expiresInSeconds = await getTokenExpiresInSeconds()

      assert.equal(expiresInSeconds, defaultTokenExpiresInSeconds)
      assert.match(warnings.join('\n'), /jwt\.tokenExpiresInSeconds/)
      assert.match(warnings.join('\n'), /abc/)
    } finally {
      console.warn = originalWarn
    }
  })

  it('uses one parser for valid and invalid token expiration values', () => {
    assert.equal(parseTokenExpiresInSeconds(300), minTokenExpiresInSeconds)
    assert.equal(parseTokenExpiresInSeconds('3600'), 3600)
    assert.equal(parseTokenExpiresInSeconds(maxTokenExpiresInSeconds), maxTokenExpiresInSeconds)
    assert.throws(() => parseTokenExpiresInSeconds(299), /mellom/)
    assert.throws(() => parseTokenExpiresInSeconds(maxTokenExpiresInSeconds + 1), /mellom/)
    assert.throws(() => parseTokenExpiresInSeconds('1h'), /mellom/)
  })

  it('creates missing default with atomic upsert and does not overwrite existing setting', async () => {
    let capturedUpdate
    let capturedOptions
    AppSetting.findOneAndUpdate = (_filter, update, options) => {
      capturedUpdate = update
      capturedOptions = options
      return leanResult({ key: tokenExpirationSettingKey, value: 3600, updatedAt: new Date('2026-01-01') })
    }
    AppSetting.findOne = () => {
      throw new Error('findOne should not be used by ensureTokenExpiresInSecondsDefault')
    }
    AppSetting.create = () => {
      throw new Error('create should not be used by ensureTokenExpiresInSecondsDefault')
    }

    const setting = await ensureTokenExpiresInSecondsDefault(7200)

    assert.deepEqual(capturedUpdate, {
      $setOnInsert: {
        key: tokenExpirationSettingKey,
        value: 7200,
      },
    })
    assert.equal(capturedOptions.upsert, true)
    assert.equal(capturedOptions.new, true)
    assert.equal(capturedOptions.runValidators, true)
    assert.equal(setting.expiresInSeconds, 3600)
    assert.equal(setting.created, false)
  })

  it('defines a unique index on AppSetting.key', () => {
    const indexes = AppSetting.schema.indexes()

    assert.ok(
      indexes.some(([fields, options]) => fields.key === 1 && options.unique === true),
      'AppSetting.key must have an explicit unique index',
    )
  })

  it('createToken uses MongoDB token expiration value', async () => {
    process.env.JWT_SECRET = 'test-secret'
    AppSetting.findOne = () => leanResult({ key: tokenExpirationSettingKey, value: 1800 })

    const token = await createToken({
      _id: { toString: () => '507f1f77bcf86cd799439011' },
      username: 'admin',
      role: 'admin',
    })
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    assert.equal(decoded.exp - decoded.iat, 1800)
  })
})
