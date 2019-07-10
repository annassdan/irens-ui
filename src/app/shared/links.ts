

export const apis = {
  warehouse: {
    post: '/api/master/warehouse',
    delete: '/api/master/warehouse',
    getById: '/api/master/warehouse',
    getAll: '/api/master/warehouse/all/data'
  },
  bank: {
    post: '/api/master/bank',
    delete: '/api/master/bank',
    getById: '/api/master/bank',
    getAll: '/api/master/bank/all/data'
  },
  item: {
    post: '/api/master/item',
    delete: '/api/master/item',
    getById: '/api/master/item',
    getAll: '/api/master/item/all/data'
  },
  people: {
    post: '/api/master/customer',
    delete: '/api/master/customer',
    getById: '/api/master/customer',
    getAll: '/api/master/customer/all/data'
  },
  transaction: {
    post: '/api/transaksi',
    getById: '/api/transaksi',
    getAll: '/api/transaksi/all/data'
  },
  stock: {
    post: '/api/stock',
    delete: '/api/stock',
    getById: '/api/stock',
    getAll: '/api/stock/all/data'
  },
};
