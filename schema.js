const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

/*
//Initial static data
const customers = [
    {id: '1', name: 'John Doe', email: 'jdoe@gmail.com', age: 30},
    {id: '2', name: 'Mary Smith', email: 'msmith@gmail.com', age: 34},
    {id: '3', name: 'Ana Carney', email: 'acarney@gmail.com', age: 27}
];
*/

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
            async resolve(parentValue, args){
                var response = await axios.get('http://localhost:3000/customers/' + args.id);
                console.log(response);
                return response.data
            }
        },
        customers: {
            type: new GraphQLList(CustomerType),
            async resolve(parentValue, args){
                var response = await axios.get('http://localhost:3000/customers');
                console.log(response);
                return response.data
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});