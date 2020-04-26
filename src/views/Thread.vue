<template>
  <div id="app">
    <!-- ナビゲーション -->
    <b-nav id="nav">
      <b-nav-item active>
        <router-link to="/">&lt; 戻る</router-link>
      </b-nav-item>
    </b-nav>

    <!-- エラーメッセージを表示するモーダル -->
    <b-modal id="error_modal">{{ errorMessage }}</b-modal>

    <!-- スレッドが見つからない場合 -->
    <div class="container" v-if="isNotFound">このスレッドは存在しません。また新しく作ろう。</div>

    <!-- スレッド -->
    <div class="container" v-if="!isNotFound">
      <!-- タイトル -->
      <h4>{{ this.title }}</h4>

      <!-- コメント表示部分 -->
      <div class="mt-3 mb-5">
        <div
          class="border rounded py-2 pl-4 mb-1"
          v-for="comment in commentList"
          v-bind:key="comment.id"
        >{{ comment.content }}</div>
      </div>

      <!-- コメント追加フォーム -->
      <amplify-connect :mutation="createCommentMutation" @done="onCreateCommentFinished">
        <template slot-scope="{ loading, mutate }">
          <div class>
            <b-card class="mb-2" title="新しくコメントする">
              <b-form class="col">
                <b-form-group label="内容" label-for="content-input">
                  <b-form-textarea
                    id="content-input"
                    v-model="createForm.content"
                    placeholder="..."
                    rows="3"
                    max-rows="6"
                  ></b-form-textarea>
                </b-form-group>

                <div class="d-flex flex-row-reverse">
                  <b-button
                    variant="primary"
                    class="mr-1"
                    :disabled="loading"
                    @click="mutate"
                  >コメントする</b-button>
                </div>
              </b-form>
            </b-card>
          </div>
        </template>
      </amplify-connect>
    </div>
  </div>
</template>

<script>
import { getThread } from "../graphql/queries";
import { createComment } from "../graphql/mutations";
import { onCreateComment } from "../graphql/subscriptions";

export default {
  name: "App",
  data() {
    return {
      isNotFound: false,

      threadId: "",
      title: "",
      errorMessage: "",
      commentList: [],
      nextToken: "",

      createForm: { content: "" }
    };
  },
  methods: {
    onCreateCommentFinished() {
      this.createForm.content = "";
    },

    // api 叩いたあとの処理
    tableListUpdateProcess(isInit) {
      return result => {
        // console.log(result);
        let threadData = result.data.getThread;

        // なかったらnot found表示
        if (threadData == null) {
          this.isNotFound = true;

          return;
        }

        // データ移し替え
        let commentList = threadData.Comments.items;
        this.threadId = threadData.id;
        this.title = threadData.title;
        this.nextToken = threadData.Comments.nextToken;

        // isNextToken
        if (isInit) {
          this.commentList = commentList;
        } else {
          this.commentList = this.commentList.concat(commentList);
        }
      };
    },

    // 検索処理
    // value クエリの変数
    // f クエリのあとの処理
    getThreadQuery(value, f) {
      // console.log(value, f);
      this.$Amplify.API.graphql({
        query: getThread,
        variables: value
      })
        .then(a => {
          f(a);
        })
        .catch(e => {
          console.log(e);
          this.errorMessage = e.errors[0].message;
          // エラーはモーダルで出す。
          this.$bvModal.show("error_modal");
        });
    },

    // コメントの検索
    searchAllComment() {
      var value = {
        id: this.threadId,
        limit: 1000 //1000が最大値
      };
      this.getThreadQuery(value, this.tableListUpdateProcess(false));
    },
    // コメントのnext tokenで検索
    searchCommentNextToken() {
      var value = {
        id: this.threadId,
        nextToken: this.nextToken
      };
      this.getThreadQuery(value, this.tableListUpdateProcess(false));
    }
  },
  computed: {
    // コメント作成フォームをクリック時のクエリ
    createCommentMutation() {
      const value = {
        input: Object.assign({ threadId: this.threadId }, this.createForm)
      };
      // console.log(value);
      return this.$Amplify.graphqlOperation(createComment, value);
    }
  },
  mounted() {
    this.threadId = this.$route.params.threadName;

    this.searchAllComment();

    // subscribe
    this.$Amplify.API.graphql({ query: onCreateComment }).subscribe({
      next: diff => {
        console.log(diff);
        if (
          !this.commentList.some(
            come => come.id === diff.value.data.onCreateComment.id
          )
        ) {
          this.commentList.push(diff.value.data.onCreateComment);
        }
      }
    });
  }
};
</script>
