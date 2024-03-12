import { OASAnalysis } from './types.cjs';
import { OASDocument } from '../types.cjs';
import 'json-schema';
import 'openapi-types';

/**
 * Analyze a given OpenAPI or Swagger definition for any OpenAPI, JSON Schema, and ReadMe-specific
 * feature uses it may contain.
 *
 * @todo this might be worth moving into the `oas` package at some point
 */
declare function analyzer(definition: OASDocument): Promise<OASAnalysis>;

export = analyzer;
