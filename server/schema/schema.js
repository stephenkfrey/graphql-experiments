const graphql = require('graphql');

const {GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLID,
    GraphQLInt, 
    GraphQLList
} = graphql;

const _ = require('lodash');

// dummy data
const books = [
    {name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1'},
    {name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2'},
    {name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3'},
    {name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2'},
    {name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3'},
    {name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3'}
];

const authors = [ 
    {name: 'Patrick Rothfuss', age: 44, id: '1'},
    {name: 'Brandon Sanderson', age: 42, id: '2'},
    {name: 'Terry Pratchett', age: 66, id: '3'}, 
    {name: 'Stephen King', age: 72, id: '4'},
    {name: 'George R. R. Martin', age: 72, id: '5'},
    {name: 'J. R. R. Tolkien', age: 72, id: '6'}
];


const BookType = new GraphQLObjectType({
    name: 'Book', 
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args) {
                console.log(parent);
                return _.find(authors, {id: parent.authorId});
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author', 
    fields: () => ({
        id: {type: GraphQLID},
        age: {type: GraphQLInt},
        name: {type: GraphQLString},
        books : {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // filter the list 'books' by property 'authorId' where it matches 'criteria' ie matches the parent.id  
                return _.filter(books, {authorId: parent.id});
            }
        }
    })
});

 const RootQuery = new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            book: {
                type: BookType,
                args: { 
                    id: {type: GraphQLID}
                }, 
                resolve(parent, args) {
                    console.log(typeof(args.id));
                    // code to get data from db / other source
                    return _.find(books, { id: args.id});
                }
            }, 
            author: {
                type: AuthorType,
                args: {
                    id: {type: GraphQLID}
                }, 
                resolve(parent, args) {
                    return _.find(authors , {id: args.id});
                }
            }
        }
    });

module.exports = new GraphQLSchema({
    query: RootQuery
});