export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
    // Allows to automatically instantiate createClient with right options
    // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
    __InternalSupabase: {
        PostgrestVersion: '13.0.5'
    }
    graphql_public: {
        Tables: {
            [_ in never]: never
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            graphql: {
                Args: {
                    extensions?: Json
                    operationName?: string
                    query?: string
                    variables?: Json
                }
                Returns: Json
            }
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
    public: {
        Tables: {
            categories: {
                Row: {
                    id: string
                    name: string
                }
                Insert: {
                    id?: string
                    name: string
                }
                Update: {
                    id?: string
                    name?: string
                }
                Relationships: []
            }
            cocktail_ingredients: {
                Row: {
                    amount: string | null
                    cocktail_id: string
                    id: string
                    ingredient_id: string
                    volume: number | null
                }
                Insert: {
                    amount?: string | null
                    cocktail_id: string
                    id?: string
                    ingredient_id: string
                    volume?: number | null
                }
                Update: {
                    amount?: string | null
                    cocktail_id?: string
                    id?: string
                    ingredient_id?: string
                    volume?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'cocktail_ingredients_cocktail_id_fkey'
                        columns: ['cocktail_id']
                        isOneToOne: false
                        referencedRelation: 'cocktails'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'cocktail_ingredients_ingredient_id_fkey'
                        columns: ['ingredient_id']
                        isOneToOne: false
                        referencedRelation: 'ingredients'
                        referencedColumns: ['id']
                    },
                ]
            }
            cocktails: {
                Row: {
                    cover_url: string | null
                    glass_id: string | null
                    id: string
                    method: string | null
                    name: string
                }
                Insert: {
                    cover_url?: string | null
                    glass_id?: string | null
                    id?: string
                    method?: string | null
                    name: string
                }
                Update: {
                    cover_url?: string | null
                    glass_id?: string | null
                    id?: string
                    method?: string | null
                    name?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'cocktails_glass_id_fkey'
                        columns: ['glass_id']
                        isOneToOne: false
                        referencedRelation: 'glasses'
                        referencedColumns: ['id']
                    },
                ]
            }
            food: {
                Row: {
                    category_id: string
                    cover_url: string | null
                    description: string | null
                    id: string
                    name: string
                    rating: number | null
                    recipe: string | null
                    time_to_cook: number | null
                }
                Insert: {
                    category_id?: string
                    cover_url?: string | null
                    description?: string | null
                    id?: string
                    name: string
                    rating?: number | null
                    recipe?: string | null
                    time_to_cook?: number | null
                }
                Update: {
                    category_id?: string
                    cover_url?: string | null
                    description?: string | null
                    id?: string
                    name?: string
                    rating?: number | null
                    recipe?: string | null
                    time_to_cook?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'food_category_id_fkey'
                        columns: ['category_id']
                        isOneToOne: false
                        referencedRelation: 'categories'
                        referencedColumns: ['id']
                    },
                ]
            }
            food_ingredients: {
                Row: {
                    food_id: string
                    id: string
                    ingredient_id: string
                }
                Insert: {
                    food_id: string
                    id?: string
                    ingredient_id: string
                }
                Update: {
                    food_id?: string
                    id?: string
                    ingredient_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'food_ingredients_food_id_fkey'
                        columns: ['food_id']
                        isOneToOne: false
                        referencedRelation: 'food'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'food_ingredients_ingredient_id_fkey'
                        columns: ['ingredient_id']
                        isOneToOne: false
                        referencedRelation: 'ingredients'
                        referencedColumns: ['id']
                    },
                ]
            }
            food_tags: {
                Row: {
                    food_id: string
                    id: string
                    tag_id: string | null
                }
                Insert: {
                    food_id: string
                    id?: string
                    tag_id?: string | null
                }
                Update: {
                    food_id?: string
                    id?: string
                    tag_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'food_tags_food_id_fkey'
                        columns: ['food_id']
                        isOneToOne: false
                        referencedRelation: 'food'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'food_tags_tag_id_fkey'
                        columns: ['tag_id']
                        isOneToOne: false
                        referencedRelation: 'tags'
                        referencedColumns: ['id']
                    },
                ]
            }
            glasses: {
                Row: {
                    id: string
                    name: string
                }
                Insert: {
                    id?: string
                    name: string
                }
                Update: {
                    id?: string
                    name?: string
                }
                Relationships: []
            }
            ingredients: {
                Row: {
                    category: string | null
                    description: string | null
                    id: string
                    name: string
                }
                Insert: {
                    category?: string | null
                    description?: string | null
                    id?: string
                    name: string
                }
                Update: {
                    category?: string | null
                    description?: string | null
                    id?: string
                    name?: string
                }
                Relationships: []
            }
            tags: {
                Row: {
                    category: string | null
                    id: string
                    name: string
                }
                Insert: {
                    category?: string | null
                    id?: string
                    name: string
                }
                Update: {
                    category?: string | null
                    id?: string
                    name?: string
                }
                Relationships: []
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
    DefaultSchemaTableNameOrOptions extends
        | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
        | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
        ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
              DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
        : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
          DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
          Row: infer R
      }
        ? R
        : never
    : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
      ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
            Row: infer R
        }
          ? R
          : never
      : never

export type TablesInsert<
    DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
        ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
        : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
          Insert: infer I
      }
        ? I
        : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
      ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
            Insert: infer I
        }
          ? I
          : never
      : never

export type TablesUpdate<
    DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
        ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
        : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
          Update: infer U
      }
        ? U
        : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
      ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
            Update: infer U
        }
          ? U
          : never
      : never

export type Enums<
    DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums'] | { schema: keyof DatabaseWithoutInternals },
    EnumName extends DefaultSchemaEnumNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
        ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
        : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
    : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
      ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
      : never

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
        | keyof DefaultSchema['CompositeTypes']
        | { schema: keyof DatabaseWithoutInternals },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
        ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
        : never = never,
> = PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
      ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
      : never

export const Constants = {
    graphql_public: {
        Enums: {},
    },
    public: {
        Enums: {},
    },
} as const
