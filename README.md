# zskt



## Project setup

```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



## 接口文档

### home页

#### 教师端获取首页信息

-  `/api/getTeacherPage`

- method: `GET`

- response:

- ```js
  data: {
      statusCode: 'OK' | 'NO_AUTHORITY' | 'NO_LOGIN';
      pageData: {
          classVos: {
              [
                  id: Long,
                  name: String,
                  count: Number,
                  avatar: String,
              ]
          }, // 班级vo列表
          messageVos: {
              [
                  id: Long,
                  type: PUNCH_RESULT | LEAVE_APPLICATION
                  content: String,
                  title: String,
                  createDate: Date,
                  punchCount: Number,
                  unpunchCount: Number,
                  leaveCount: Number,
                  classCount: Number,
              ]
          }, // 消息通知列表
          currentPunchVo: {
              classVo: {}, // 当前正在打卡的班级
              startDate: Date,
              endDate: Date,
              address: String,
          }, // 当前正在进行的打卡
      }
  }
  ```

#### 加载更多消息通知

- `/api/loadMessageList`
- methods: `GET`
- request: `page`
- response: `messageVos`