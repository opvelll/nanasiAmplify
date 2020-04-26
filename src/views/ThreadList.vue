<template>
  <div id="threadList">
    <!-- nav -->
    <b-nav id="nav" align="center">
      <!-- ページ名 -->
      <b-nav-text>匿名掲示板（β）</b-nav-text>
    </b-nav>
    <!-- エラーメッセージを表示するモーダル -->
    <b-modal id="error_modal">{{ errorMessage }}</b-modal>
    <div class="container">
      <amplify-connect
        :query="listThreadQuery"
        :subscription="createThreadSubscription"
        :onSubscriptionMsg="onCreateTodo"
      >
        <template slot-scope="{ loading, data, errors }">
          <div v-if="loading">Loading...</div>

          <div v-else-if="errors.length > 0">{{ errors }}</div>

          <div v-else-if="data">
            <b-table borderless small :items="data.listThreads.items" :fields="fields">
              <template v-slot:cell(title)="data">
                <router-link :to="data.item.id">{{ data.item.title }}</router-link>
              </template>
            </b-table>
          </div>
        </template>
      </amplify-connect>

      <amplify-connect :mutation="createThreadMutation" @done="onCreateFinished">
        <template slot-scope="{ loading, mutate, errors }">
          <b-card title="新しいスレッドを作成する">
            <b-form class="col">
              <b-form-group label="スレッド名" label-for="pageInput">
                <b-form-input
                  type="text"
                  id="pageInput"
                  v-model="createThreadForm.title"
                  placeholder="好きなスレッド名"
                ></b-form-input>
              </b-form-group>

              <b-form-group label="最初のコメント" label-for="firstComment">
                <b-form-input
                  type="text"
                  id="firstComment"
                  v-model="createThreadForm.firstComment"
                  placeholder="最初のコメント"
                ></b-form-input>
              </b-form-group>

              <div v-for="(error, index) in errors" v-bind:key="index">{{ error.message }}</div>

              <div class="d-flex flex-row-reverse">
                <b-button variant="primary" class="mr-1" :disabled="loading" @click="mutate">作成</b-button>
              </div>
            </b-form>
          </b-card>
        </template>
      </amplify-connect>
    </div>
  </div>
</template>

<script>
import { listThreads } from "../graphql/queries.js";
import { createThread, createComment } from "../graphql/mutations.js";
import { onCreateThread } from "../graphql/subscriptions";

export default {
  data() {
    return {
      fields: [{ key: "title", label: "スレッド名" }],
      errorMessage: "",

      createThreadForm: {
        title: "",
        firstComment: ""
      }
    };
  },
  methods: {
    // スレッド生成後にコメントを追加。追加できたらスレッドページに移動
    onCreateFinished(result) {
      this.createCommentQuery(result);
    },

    createCommentQuery(thread) {
      // console.log(result);
      let value = {
        input: {
          threadId: thread.data.createThread.id,
          content: this.createThreadForm.firstComment
        }
      };

      this.$Amplify.API.graphql({
        query: createComment,
        variables: value
      })
        .then(result => {
          // console.log(result);
          this.$router.push(result.data.createComment.threadId);
        })
        .catch(e => {
          // console.log(e);
          if (e.errors != undefined) {
            this.errorMessage = e.errors[0].message;
            // エラーはモーダルで出す。
            this.$bvModal.show("error_modal");
          }
        });
    },

    onCreateTodo(prevData, newData) {
      const diff = newData.onCreateThread;
      // console.log("pre : ", prevData, "  new : " + newData + " diff : " + diff);

      prevData.data.listThreads.items.push(diff);
      return prevData.data;
    }
  },
  computed: {
    listThreadQuery() {
      return this.$Amplify.graphqlOperation(listThreads, { limit: 1000 });
    },
    createThreadMutation() {
      return this.$Amplify.graphqlOperation(createThread, {
        input: { title: this.createThreadForm.title }
      });
    },
    createThreadSubscription() {
      return this.$Amplify.graphqlOperation(onCreateThread);
    }
  }
};
</script>
