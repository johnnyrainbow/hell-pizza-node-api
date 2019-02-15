var chai = require('chai');
var expect = chai.expect;
var Order = require('../src/Order')
var Menu = require('../src/Menu')
var async = require('async')
describe('Order', function () {
    describe('CheckInitOrder', function () {
        it('should attempt to init order', function (done) {
            var menu = new Menu()
            var store_id = 1
            var order = new Order(store_id, menu, null)
            order.initOrder(function (err) {
                expect(err).to.be.null
                expect(order.token).to.exist
                expect(order.order_id).to.exist
                done()
            })
        })
    })

    describe('CheckAddItemToOrder', function () {
        it('should attempt to add item to order', function (done) {
            var menu = new Menu()
            var store_id = 1
            var order = new Order(store_id, menu, null)
            var item_id = 5
            var item_quantity = 1
            var item_size_id = 3

            order.initOrder(function (err) {
                order.addItemToOrder(item_id, item_size_id, item_quantity, {}, '', function (err, response) {
                    expect(err).to.be.null
                    expect(response).to.exist
                    expect(order.items.length).to.equal(1)
                    expect(order.items[0].item_id).to.equal(item_id)
                    done()
                })
            })
        })
    })

    describe('CheckRemoveItemFromOrder', function () {
        it('should attempt to remove an item from order', function (done) {
            var menu = new Menu()
            var store_id = 1
            var order = new Order(store_id, menu, null)
            var item_id = 5
            var item_quantity = 1
            var item_size_id = 3

            async.series([
                function (callback) {
                    order.initOrder(function (err, response) {
                        callback(err, response)
                    })
                },
                function (callback) {
                    order.addItemToOrder(item_id, item_size_id, item_quantity, {}, '', function (err, response) {
                        callback(err, response)
                    })
                },
                function (callback) {
                    order.removeItemFromOrder(order.items[0].order_item_id, function (err, response) {
                        callback(err, response)
                    })
                }
            ], function (err, results) {
                expect(err).to.be.null
                expect(results.length).to.equal(3)
                expect(order.items.length).to.equal(0)
                done()
            });
        })
    })
})