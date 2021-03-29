<template>
  <div class="chat_page">
    <zs-nav-bar title="软件1班"></zs-nav-bar>
    <div class="message_box">
      <template v-for="(msg, idx) in msgList">
        <div :key="idx" v-if="msg.userId !== userInfo.id" class="message">
          <div class="avatar"><img src="@/images/default_avatar.png" alt=""></div>
          <div class="block">
            <div class="info">{{msg.realName}} {{new Date(msg.createTime).Format('yyyy/MM/dd hh:mm:ss')}}</div>
            <div class="msg">{{msg.msg}}</div>
          </div>
        </div>
        <div :key="idx" v-else class="message me">
          <div class="block">
            <div class="info">{{msg.realName}} {{new Date(msg.createTime).Format('yyyy/MM/dd hh:mm:ss')}}</div>
            <div class="msg">{{msg.msg}}</div>
          </div>
          <div class="avatar"><img src="@/images/default_avatar.png" alt=""></div>
        </div>
      </template>
    </div>
    <div class="foot_bar">
      <div class="input"><textarea v-model="chatMsg" /></div>
      <div @click="sendMsg" @keypress.enter="sendMsg" class="button">发送</div>
    </div>
  </div>
</template>

<script>
import ZsNavBarVue from '../../components/zs_nav_bar/ZsNavBar.vue';
import UserAPI from '../../api/userAPI';
export default {
  components: { zsNavBar: ZsNavBarVue },
  data() {
    return {
      roomId: "",
      userInfo: {},
      chatMsg: "",
      msgList: []
    };
  },
  mounted() {
    UserAPI.getMyUserInfo().then(({data}) => {
      this.userInfo = data;
      this.roomId = this.$route.query.roomId;
      this.$socket.emit('joinRoom', this.roomId);
      this.$socket.on('receive_chat_msg', (msgVo) => {
        this.msgList.push(JSON.parse(msgVo));
      });
    });
  },
  beforeDestroy() {
    this.$socket.emit('leaveRoom', this.roomId);
  },
  methods: {
    sendMsg() {
      if(!this.chatMsg) {
        return;
      }
      const msgVo = {
        roomId: this.roomId,
        userId: this.userInfo.id,
        realName: this.userInfo.realName,
        createTime: new Date(),
        msg: this.chatMsg
      };
      this.msgList.push(msgVo);
      this.$socket.emit('send_chat_msg', JSON.stringify(msgVo));
      this.chatMsg = "";
    }
  }
};
</script>

<style src="./chat_page.css" scoped></style>