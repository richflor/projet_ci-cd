export type StructuredErrors =
  // SQL
  'sql/failed' |
  'sql/not-found' |

  // Crud
  'validation/failed' |

  // Default
  'internal/unknown'
  ;
