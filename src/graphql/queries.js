/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getThread = /* GraphQL */ `
  query GetThread($id: ID!) {
    getThread(id: $id) {
      id
      title
      tags
      Comments {
        items {
          id
          threadId
          content
          createdAt
          updatedAt
          good
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listThreads = /* GraphQL */ `
  query ListThreads(
    $filter: ModelThreadFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listThreads(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        tags
        Comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      threadId
      content
      createdAt
      updatedAt
      good
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        threadId
        content
        createdAt
        updatedAt
        good
      }
      nextToken
    }
  }
`;
