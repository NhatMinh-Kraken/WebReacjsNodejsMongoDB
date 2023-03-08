// setup
db.products.insert({
    _id: ObjectId('61c5e1e7c2ec39450cdf41b7'),
    name: 'lorem ipsum dolor set',
    image: '1452877_product.png',
    type: 'immo file',
    price: 20
  });
  db.orders.insertMany([{
    _id: ObjectId('61c45d25bdf9c1389879db9f'),
    orderItems: [{
      options: [{
        _id: ObjectId('61fd914d4a236b94f816c27d'),
        question: 'lorem ipsum dolor set amet',
        answer: 'lorem'
      }, {
        _id: ObjectId('61fd914d4a236b94f816c27d'),
        question: 'lorem ipsum dolor set amet',
        answer: 'lorem'
      }, {
        _id: ObjectId('61fd914d4a236b94f816c27d'),
        question: 'lorem ipsum dolor set amet',
        answer: 'lorem'
      }, {
        _id: ObjectId('61fd914d4a236b94f816c27d'),
        question: 'lorem ipsum dolor set amet',
        answer: 'lorem'
      }, ],
      quantity: 4,
      product: ObjectId('61c5e1e7c2ec39450cdf41b7')
    }, {
      options: [{
          _id: ObjectId('61fd914d4a236b94f816c27d'),
          question: 'lorem ipsum dolor set amet',
          answer: 'lorem'
        }, {
          _id: ObjectId('61fd914d4a236b94f816c27d'),
          question: 'lorem ipsum dolor set amet',
          answer: 'lorem'
        },
        {
          _id: ObjectId('61fd914d4a236b94f816c27d'),
          question: 'lorem ipsum dolor set amet',
          answer: 'lorem'
        }, {
          _id: ObjectId('61fd914d4a236b94f816c27d'),
          question: 'lorem ipsum dolor set amet',
          answer: 'lorem'
        },
      ],
      quantity: 3,
      product: ObjectId('61c5e1e7c2ec39450cdf41b7')
    }]
  }])