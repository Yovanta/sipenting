import {ApolloClient, InMemoryCache} from "@apollo/client"

const client = new ApolloClient({
    uri: "https://sipenting.hasura.app/v1/graphql",
    cache: new InMemoryCache(),
    headers: {
        "x-hasura-admin-secret" : "w4kfFYdnQEvzrNG19Y3LL7Lb2qv8Bx4W3Ey49EfX5NJNmY6TS9dt1T6xp4aGDH2h",
    },
});

export default client