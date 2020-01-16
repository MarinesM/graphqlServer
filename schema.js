const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

//Initial static data
const customers = [
    {id: '1', name: 'John Doe', email: 'jdoe@gmail.com', age: 30},
    {id: '2', name: 'Mary Smith', email: 'msmith@gmail.com', age: 34},
    {id: '3', name: 'Ana Carney', email: 'acarney@gmail.com', age: 27}
];

const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer: {
            type: CustomerType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parentValue, args){
                for(let i = 0; i < customers.length; i++){
                    if (customers[i].id == args.id){
                        return customers[i];
                    }
                }
            }
        },
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(parentValue, args){
                return customers;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});