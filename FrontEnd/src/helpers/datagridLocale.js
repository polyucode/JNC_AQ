
export const DATAGRID_LOCALE_TEXT = {
  // Root
  noRowsLabel: 'Sin filas',
  noResultsOverlayLabel: 'Sin resultados.',
  errorOverlayDefaultLabel: 'Ha ocurrido un error.',

  // Density selector toolbar button text
  toolbarDensity: 'Densidad',
  toolbarDensityLabel: 'Densidad',
  toolbarDensityCompact: 'Compacto',
  toolbarDensityStandard: 'Estandard',
  toolbarDensityComfortable: 'Cómodo',

  // Columns selector toolbar button text
  toolbarColumns: 'Columnas',
  toolbarColumnsLabel: 'Seleccionar columnas',

  // Filters toolbar button text
  toolbarFilters: 'Filtros',
  toolbarFiltersLabel: 'Mostrar filtros',
  toolbarFiltersTooltipHide: 'Ocultar filters',
  toolbarFiltersTooltipShow: 'Mostrar filtros',
  toolbarFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} filtros activos` : `${count} filtro activo`,

  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: 'Buscar…',
  toolbarQuickFilterLabel: 'Buscar',
  toolbarQuickFilterDeleteIconLabel: 'Limpiar',

  // Export selector toolbar button text
  toolbarExport: 'Exportar',
  toolbarExportLabel: 'Exportar',
  toolbarExportCSV: 'Descargar como CSV',
  toolbarExportPrint: 'Imprimir',
  toolbarExportExcel: 'Descargar como Excel',

  // Columns panel text
  columnsPanelTextFieldLabel: 'Buscar columna',
  columnsPanelTextFieldPlaceholder: 'Nombre de la columna',
  columnsPanelDragIconLabel: 'Reordenar columna',
  columnsPanelShowAllButton: 'Mostrar todas',
  columnsPanelHideAllButton: 'Ocultar todas',

  // Filter panel text
  filterPanelAddFilter: 'Añadir filtro',
  filterPanelDeleteIconLabel: 'Eliminar',
  filterPanelLinkOperator: 'Operador lógico',
  filterPanelOperators: 'Operador', // TODO v6: rename to filterPanelOperator
  filterPanelOperatorAnd: 'Y',
  filterPanelOperatorOr: 'O',
  filterPanelColumns: 'Columna',
  filterPanelInputLabel: 'Valor',
  filterPanelInputPlaceholder: 'Valor del filtro',

  // Filter operators text
  filterOperatorContains: 'contiene',
  filterOperatorEquals: 'es exactamente',
  filterOperatorStartsWith: 'empieza por',
  filterOperatorEndsWith: 'acaba con',
  filterOperatorIs: 'es',
  filterOperatorNot: 'no es',
  filterOperatorAfter: 'viene después de',
  filterOperatorOnOrAfter: 'está en o viene después de',
  filterOperatorBefore: 'viene antes de',
  filterOperatorOnOrBefore: 'está en o viene antes de',
  filterOperatorIsEmpty: 'está vacío',
  filterOperatorIsNotEmpty: 'no está vacío',
  filterOperatorIsAnyOf: 'es cualquiera de',

  // Filter values text
  filterValueAny: 'any',
  filterValueTrue: 'true',
  filterValueFalse: 'false',

  // Column menu text
  columnMenuLabel: 'Menú',
  columnMenuShowColumns: 'Mostrar columnas',
  columnMenuFilter: 'Filtro',
  columnMenuHideColumn: 'Ocultar',
  columnMenuUnsort: 'Quitar orden',
  columnMenuSortAsc: 'Orden ascendiente',
  columnMenuSortDesc: 'Orden descendiente',

  // Column header text
  columnHeaderFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} filtros activos` : `${count} filtro activo`,
  columnHeaderFiltersLabel: 'Mostrar filtros',
  columnHeaderSortIconLabel: 'Ordenar',

  // Rows selected footer text
  footerRowSelected: (count) =>
    count !== 1
      ? `${count.toLocaleString()} registros seleccionados`
      : `${count.toLocaleString()} registro seleccionado`,

  // Total row amount footer text
  footerTotalRows: 'Total de registros:',

  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} de ${totalCount.toLocaleString()}`,

  // Checkbox selection text
  checkboxSelectionHeaderName: 'Checkbox selection',
  checkboxSelectionSelectAllRows: 'Select all rows',
  checkboxSelectionUnselectAllRows: 'Unselect all rows',
  checkboxSelectionSelectRow: 'Select row',
  checkboxSelectionUnselectRow: 'Unselect row',

  // Boolean cell text
  booleanCellTrueLabel: 'yes',
  booleanCellFalseLabel: 'no',

  // Actions cell more text
  actionsCellMore: 'más',

  // Column pinning text
  pinToLeft: 'Pin to left',
  pinToRight: 'Pin to right',
  unpin: 'Unpin',

  // Tree Data
  treeDataGroupingHeaderName: 'Group',
  treeDataExpand: 'see children',
  treeDataCollapse: 'hide children',

  // Grouping columns
  groupingColumnHeaderName: 'Group',
  groupColumn: (name) => `Group by ${name}`,
  unGroupColumn: (name) => `Stop grouping by ${name}`,

  // Master/detail
  detailPanelToggle: 'Detail panel toggle',
  expandDetailPanel: 'Expand',
  collapseDetailPanel: 'Collapse',

  // Used core components translation keys
  MuiTablePagination: {},

  // Row reordering text
  rowReorderingHeaderName: 'Row reordering',

  // Aggregation
  aggregationMenuItemHeader: 'Aggregation',
  aggregationFunctionLabelSum: 'sum',
  aggregationFunctionLabelAvg: 'avg',
  aggregationFunctionLabelMin: 'min',
  aggregationFunctionLabelMax: 'max',
  aggregationFunctionLabelSize: 'size',
};