/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateThread = /* GraphQL */ `
  subscription OnCreateThread {
    onCreateThread {
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
export const onUpdateThread = /* GraphQL */ `
  subscription OnUpdateThread {
    onUpdateThread {
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
export const onDeleteThread = /* GraphQL */ `
  subscription OnDeleteThread {
    onDeleteThread {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
      id
      threadId
      content
      createdAt
      updatedAt
      good
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
      id
      threadId
      content
      createdAt
      updatedAt
      good
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
      id
      threadId
      content
      createdAt
      updatedAt
      good
    }
  }
`;
