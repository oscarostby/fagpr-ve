import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import {
  allowedDietaryTags,
  dietaryTagLabels,
  parseDietaryTags,
} from './dietaryTags.js'

describe('dietaryTags', () => {
  it('exposes the allowed dietary tag keys and Norwegian labels', () => {
    assert.deepEqual(allowedDietaryTags, ['vegetarian', 'vegan', 'halal', 'kosher'])
    assert.equal(dietaryTagLabels.vegetarian, 'Vegetar')
    assert.equal(dietaryTagLabels.vegan, 'Vegansk')
    assert.equal(dietaryTagLabels.halal, 'Halal')
    assert.equal(dietaryTagLabels.kosher, 'Kosher')
  })

  it('parses JSON, comma separated and repeated dietary tag fields', () => {
    assert.deepEqual(parseDietaryTags('["vegetarian","halal"]'), ['vegetarian', 'halal'])
    assert.deepEqual(parseDietaryTags('vegan,kosher'), ['vegan', 'kosher'])
    assert.deepEqual(parseDietaryTags(['vegetarian', 'halal,kosher']), ['vegetarian', 'halal', 'kosher'])
  })

  it('removes duplicates and rejects unknown dietary tags', () => {
    assert.deepEqual(parseDietaryTags(['vegan', 'vegan', 'halal']), ['vegan', 'halal'])
    assert.throws(() => parseDietaryTags('paleo'), /Ugyldig kostholdsmerke/)
  })

  it('returns empty list for missing or empty dietary tags', () => {
    assert.deepEqual(parseDietaryTags(undefined), [])
    assert.deepEqual(parseDietaryTags(''), [])
    assert.deepEqual(parseDietaryTags('[]'), [])
  })
})
