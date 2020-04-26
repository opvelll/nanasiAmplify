/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createThread = /* GraphQL */ `
  mutation CreateThread(
    $input: CreateThreadInput!
    $condition: ModelThreadConditionInput
  ) {
    createThread(input: $input, condition: $condition) {
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
export const updateThread = /* GraphQL */ `
  mutation UpdateThread(
    $input: UpdateThreadInput!
    $condition: ModelThreadConditionInput
  ) {
    updateThread(input: $input, condition: $condition) {
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
export const deleteThread = /* GraphQL */ `
  mutation DeleteThread(
    $input: DeleteThreadInput!
    $condition: ModelThreadConditionInput
  ) {
    deleteThread(input: $input, condition: $condition) {
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
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      threadId
      content
      createdAt
      updatedAt
      good
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      threadId
      content
      createdAt
      updatedAt
      good
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      threadId
      content
      createdAt
      updatedAt
      good
    }
  }
`;
