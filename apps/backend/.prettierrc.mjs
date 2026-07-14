export default {
    singleQuote: true,
    trailingComma: 'all',
    printWidth: 120,
    tabWidth: 4,
    semi: false,
    plugins: ['@trivago/prettier-plugin-sort-imports'],
    importOrderGroupNamespaceSpecifiers: true,
    importOrderParserPlugins: ['typescript', 'jsx'],
    importOrderSortSpecifiers: true,
    importOrderSeparation: true,
    importOrder: ['<THIRD_PARTY_MODULES>', '^[../]', '^[./]'],
}
