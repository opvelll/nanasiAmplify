export const getThreadByTitle = /* GraphQL */ `
  query GetThreadByTitle(
    $title: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelThreadFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getThreadByTitle(
      title: $title
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        tags
        Comments {
          items {
            content
            createdAt
            good
            id
            threadId
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
    }
  }
`;
