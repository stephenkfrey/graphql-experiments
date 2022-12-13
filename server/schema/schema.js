const garphql = require('graphql');

const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

const _ = require('lodash');

// dummy data
const books = [
    {name: 'Name of the Wind', genre: 'Fantasy', id: '1'},
    {name: 'The Final Empire', genre: 'Fantasy', id: '2'},
    {name: 'The Long Earth', genre: 'Sci-Fi', id: '3'}
];

const BookType = new GraphQLObjectType({
    name: 'Book', 
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
});

 const RootQuery = GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            book: {
                type: BookType,
                args: { 
                    id: {type: GraphQLString}
                }, 
                resolve(parent, args) {
                    // code to get data from db / other source
                    _.find(books, { id: args.id});
                }
            }
        }
    });

module.exports = new GraphQLSchema({
    query: RootQuery
});