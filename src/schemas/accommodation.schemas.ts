import { z } from 'zod'

export const queryParamSchema = z.object({
  address: z.coerce.boolean().optional(),
  rules: z.coerce.boolean().optional(),
})

export const paramSchema = z.object({
  id: z.string(),
})

export const propertyTypeSchema = z.object({
  property_type: z.enum([
    'APARTAMENTO',
    'CASA',
    'POUSADA',
    'MOTEL',
    'HOTEL',
    'RESORT',
  ]),
})

export const spaceTypeSchema = z.object({
  space_type: z.enum(['ALL', 'BEDROOM', 'ALBERG']),
})

export const addressSchema = z.object({
  lat: z.coerce.number(),
  lon: z.coerce.number(),
  cep: z.string().length(9),
  street: z.string().min(1),
  neighborhood: z.string().min(1),
  number: z.coerce.number().int().nonnegative(),
  state: z.string().length(2),
  city: z.string().min(1).max(40),
})

export const servicesSchema = z.object({
  wifi: z.boolean().default(false),
  air: z.boolean().default(false),
  tv: z.boolean().default(false),
  kitchen: z.boolean().default(false),
  pool: z.boolean().default(false),
  parking: z.boolean().default(false),
  heater: z.boolean().default(false),
  gym: z.boolean().default(false),
  grill: z.boolean().default(false),
  jacuzzi: z.boolean().default(false),
  hotTub: z.boolean().default(false),

  balcony: z.boolean().default(false),
  bedlinen: z.boolean().default(false),
  breakfast: z.boolean().default(false),
  cityView: z.boolean().default(false),
  crib: z.boolean().default(false),
  elevator: z.boolean().default(false),
  reception: z.boolean().default(false),
  safe: z.boolean().default(false),
  seaView: z.boolean().default(false),
  wheelchairAccessibility: z.boolean().default(false),
})

export const rulesSchema = z.object({
  animals: z.boolean(),
  events: z.boolean(),
  optional: z.string(),
})

export const detailsSchema = z.object({
  bedrooms: z.number().int().min(0),
  beds: z.number().int().min(0),
  bathrooms: z.number().int().min(0),
  max_guests: z.number().int().min(0),
})

export const finishSchema = z.object({
  title: z.string(),
  description: z.string(),
  price_per_night: z.number().positive(),
})

export const photoSchema = z.object({
  key: z.string().max(255),
  cover: z.boolean().default(false),
})

export const photosSchema = z.object({
  photos: z.array(photoSchema).min(1),
})

export const accomodationResponse = z.object({
  owner_id: z.string().length(20),

  space_type: z.enum(['ALL', 'BEDROOM', 'SHARED']),
  property_type: z.enum([
    'APARTAMENTO',
    'CASA',
    'POUSADA',
    'MOTEL',
    'HOTEL',
    'RESORT',
  ]),

  available: z.boolean(),

  title: z.string().max(1000).optional(),
  description: z.string().optional(),
  price_per_night: z.coerce.number().positive().optional(),

  max_guests: z.coerce.number().int().positive().optional(),
  bedrooms: z.coerce.number().int().positive().optional(),
  bathrooms: z.coerce.number().int().positive().optional(),

  address: addressSchema.optional(),
  services: servicesSchema.optional(),
  rules: rulesSchema.optional(),

  photos: z.array(photoSchema).optional(),
})