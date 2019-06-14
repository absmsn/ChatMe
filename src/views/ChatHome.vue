<template>
  <div class="chat-home">
    <div class="main">
      <div class="nav-bar" v-if="mobileMainView || isMobileView===false || activeSessionId===null" :style="{'max-width': isMobileView?'unset':'352px'}">
        <div class="nav-search">
          <input type="search" class="nav-search-input" placeholder="输入以搜索消息">
          <svg
            style="font-size: 18px;background-color: white;position: absolute;right: 24px;top:0;bottom:0;margin: auto;"
            viewBox="64 64 896 896"
            data-icon="search"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"
            ></path>
          </svg>
        </div>
        <div class="nav-list">
          <div
            class="nav-list-item"
            v-for="item in aslList"
            :key="item.sessionId"
            @click="switchActiveSession(item.sessionId)"
            :style="{'background-color': item.sessionId===activeSessionId?'aliceblue':'white'}"
          >
            <div class="avatar"
                :style="{background: item.themeColor}"
            > 
            <!-- :style="{'background-image': 'linear-gradient(to bottom,pink,#ff00cb)'}"> -->
              <span></span>
            </div>
            <div class="unread-msg-short disable-text-select">
              <div class="nav-list-item-username text-overflow-truncate">{{item.originalToken}}</div>
              <div class="nav-list-item-lately-msg text-overflow-truncate">
                <div v-if="item.lastMsg!==null">{{item.lastMsg | lastMessageRepresentation}}</div>
              </div>
            </div>
            <div class="unread-msg-info">
              <div class="unread-msg-number-area">
                <div class="unread-msg-number centered-container" v-if="item.unreadCount!==0">
                  {{item.unreadCount |
                  unreadMsgCount}}
                </div>
              </div>
              <div class="unread-msg-time">
                <span v-if="item.lastMsg!==null">{{item.lastMsg.sendTime | timeRepresentation}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom-area">
          <!--div class="bottom-area-button-area">
            <svg
              viewBox="64 64 896 896"
              data-icon="setting"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
              class="bottom-area-button centered-container"
            >
              <path
                d="M924.8 625.7l-65.5-56c3.1-19 4.7-38.4 4.7-57.8s-1.6-38.8-4.7-57.8l65.5-56a32.03 32.03 0 0 0 9.3-35.2l-.9-2.6a443.74 443.74 0 0 0-79.7-137.9l-1.8-2.1a32.12 32.12 0 0 0-35.1-9.5l-81.3 28.9c-30-24.6-63.5-44-99.7-57.6l-15.7-85a32.05 32.05 0 0 0-25.8-25.7l-2.7-.5c-52.1-9.4-106.9-9.4-159 0l-2.7.5a32.05 32.05 0 0 0-25.8 25.7l-15.8 85.4a351.86 351.86 0 0 0-99 57.4l-81.9-29.1a32 32 0 0 0-35.1 9.5l-1.8 2.1a446.02 446.02 0 0 0-79.7 137.9l-.9 2.6c-4.5 12.5-.8 26.5 9.3 35.2l66.3 56.6c-3.1 18.8-4.6 38-4.6 57.1 0 19.2 1.5 38.4 4.6 57.1L99 625.5a32.03 32.03 0 0 0-9.3 35.2l.9 2.6c18.1 50.4 44.9 96.9 79.7 137.9l1.8 2.1a32.12 32.12 0 0 0 35.1 9.5l81.9-29.1c29.8 24.5 63.1 43.9 99 57.4l15.8 85.4a32.05 32.05 0 0 0 25.8 25.7l2.7.5a449.4 449.4 0 0 0 159 0l2.7-.5a32.05 32.05 0 0 0 25.8-25.7l15.7-85a350 350 0 0 0 99.7-57.6l81.3 28.9a32 32 0 0 0 35.1-9.5l1.8-2.1c34.8-41.1 61.6-87.5 79.7-137.9l.9-2.6c4.5-12.3.8-26.3-9.3-35zM788.3 465.9c2.5 15.1 3.8 30.6 3.8 46.1s-1.3 31-3.8 46.1l-6.6 40.1 74.7 63.9a370.03 370.03 0 0 1-42.6 73.6L721 702.8l-31.4 25.8c-23.9 19.6-50.5 35-79.3 45.8l-38.1 14.3-17.9 97a377.5 377.5 0 0 1-85 0l-17.9-97.2-37.8-14.5c-28.5-10.8-55-26.2-78.7-45.7l-31.4-25.9-93.4 33.2c-17-22.9-31.2-47.6-42.6-73.6l75.5-64.5-6.5-40c-2.4-14.9-3.7-30.3-3.7-45.5 0-15.3 1.2-30.6 3.7-45.5l6.5-40-75.5-64.5c11.3-26.1 25.6-50.7 42.6-73.6l93.4 33.2 31.4-25.9c23.7-19.5 50.2-34.9 78.7-45.7l37.9-14.3 17.9-97.2c28.1-3.2 56.8-3.2 85 0l17.9 97 38.1 14.3c28.7 10.8 55.4 26.2 79.3 45.8l31.4 25.8 92.8-32.9c17 22.9 31.2 47.6 42.6 73.6L781.8 426l6.5 39.9zM512 326c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm79.2 255.2A111.6 111.6 0 0 1 512 614c-29.9 0-58-11.7-79.2-32.8A111.6 111.6 0 0 1 400 502c0-29.9 11.7-58 32.8-79.2C454 401.6 482.1 390 512 390c29.9 0 58 11.6 79.2 32.8A111.6 111.6 0 0 1 624 502c0 29.9-11.7 58-32.8 79.2z"
              ></path>
            </svg>
          </div-->
          <div class="bottom-area-button-area">
            <router-link to="/add-session">
              <svg
                viewBox="64 64 896 896"
                data-icon="plus"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                class="bottom-area-button centered-container"
              >
                <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path>
                <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"></path>
              </svg>
            </router-link>
          </div>
          <div class="bottom-area-button-area">
            <router-link to="/dialog-record">
              <svg
              viewBox="0 0 1024 1024"
              data-icon="bars"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
              class="bottom-area-button centered-container"
            >
              <path
                d="M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 1 0 112 0 56 56 0 1 0-112 0zm0 284a56 56 0 1 0 112 0 56 56 0 1 0-112 0zm0 284a56 56 0 1 0 112 0 56 56 0 1 0-112 0z"
              ></path>
            </svg>
            </router-link>
          </div>
          <div class="bottom-area-button-area">
            <div class="popout-window-area" v-if="timingLogoutEnabled">
                <div class="popout-window centered-container">
                  <div style="padding: 10px 0 15px 0;">在无活动</div>
                  <div style="display: flex;justify-content: space-evenly;">
                    <div>
                      <input
                        type="text" class="time-input-box"
                        oninput="let a=value.match(/2[0-3]|1\d|\d/);value=a?a[0]:''"
                        ref="timingLogoutHour"
                      > 时
                    </div>
                    <div>
                      <input
                        type="text" class="time-input-box"
                        oninput="let a=value.match(/[1-5]\d|\d/);value=a?a[0]:''"
                        ref="timingLogoutMinute"
                      > 分
                    </div>
                    <div>
                      <input type="text" class="time-input-box" max="23"
                        oninput="let a=value.match(/[1-5]\d|\d/);value=a?a[0]:''"
                        ref="timingLogoutSecond"
                      > 秒
                    </div>
                  </div>
                  <div style="margin: 15px auto;">后关闭</div>
                  <div style="border-top: 1px solid #CFCFCF;flex: 0 0 auto;display: flex;cursor: default;">
                    <div
                      style="background-color: white;width: 50%;line-height: 27px;border-radius: 0 0 0 10px;"
                      @click.stop="timingLogout($refs.timingLogoutHour.value, $refs.timingLogoutMinute.value, $refs.timingLogoutSecond.value)"
                    >确定</div>
                    <div
                      style="background-color: white;width: 50%;line-height: 27px;border-left: 1px solid #CFCFCF;border-radius: 0 0 10px 0;"
                      @click.stop="timingLogoutEnabled=false"
                    >取消</div>
                  </div>
                </div>
              </div>
            <svg
              viewBox="64 64 896 896"
              data-icon="poweroff"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
              class="bottom-area-button centered-container"
              @click.self="controlLogoutAllEnabled()"
            >
              <path
                d="M705.6 124.9a8 8 0 0 0-11.6 7.2v64.2c0 5.5 2.9 10.6 7.5 13.6a352.2 352.2 0 0 1 62.2 49.8c32.7 32.8 58.4 70.9 76.3 113.3a355 355 0 0 1 27.9 138.7c0 48.1-9.4 94.8-27.9 138.7a355.92 355.92 0 0 1-76.3 113.3 353.06 353.06 0 0 1-113.2 76.4c-43.8 18.6-90.5 28-138.5 28s-94.7-9.4-138.5-28a353.06 353.06 0 0 1-113.2-76.4A355.92 355.92 0 0 1 184 650.4a355 355 0 0 1-27.9-138.7c0-48.1 9.4-94.8 27.9-138.7 17.9-42.4 43.6-80.5 76.3-113.3 19-19 39.8-35.6 62.2-49.8 4.7-2.9 7.5-8.1 7.5-13.6V132c0-6-6.3-9.8-11.6-7.2C178.5 195.2 82 339.3 80 506.3 77.2 745.1 272.5 943.5 511.2 944c239 .5 432.8-193.3 432.8-432.4 0-169.2-97-315.7-238.4-386.7zM480 560h64c4.4 0 8-3.6 8-8V88c0-4.4-3.6-8-8-8h-64c-4.4 0-8 3.6-8 8v464c0 4.4 3.6 8 8 8z"
              ></path>
            </svg>
            <div
              style="bottom:36px;right:32px;width:100px;"
              class="popout-menubar"
              v-if="logoutAllEnabled"
              @click.stop="logoutAllEnabled=false"
              v-once
            >
              <div class="centered-container" style="position:fixed;z-index:-1" @click.stop="logoutAllEnabled=false"></div>
              <div class="popout-menubar-item" @click.self="globalLogout(0)">注销所有会话</div>
              <div class="popout-menubar-item" @click.self="timingLogoutEnabled=true">定时注销会话</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="activeSessionId!==null && isMobileView===false" style="width:3px;background-image:linear-gradient(to right,#cfcfcf,white);">
        <div style="height:32.5px;border-bottom:1px solid #cfcfcf;"></div>
        <div style="height:calc(100% - 69.5px)"></div>
        <div style="height:36px;border-top:1px solid #cfcfcf;"></div>
      </div>
      <div class="introduction-page" v-if="activeSessionId===null && isMobileView===false"></div>
      <div class="content-box" v-if="(isMobileView!==true || mobileMainView===false) && activeSessionId!==null">
        <div class="top-manipulation-area">
          <div class="header-left-button-group">
            <div style="position:relative;height:100%;width:32px;" @click.stop="mobileMainView=true">
              <svg v-if="isMobileView===true" viewBox="64 64 896 896" width="16px" height="16px" fill="currentColor" aria-hidden="true" class="centered-container"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
            </svg>
            </div>
          </div>
          <div class="session-name text-overflow-truncate">{{activeSessionBox.originalToken}}</div>
          <div class="header-right-button-group">
            <div class="header-right-button-item">
              <svg
                viewBox="64 64 896 896"
                data-icon="picture"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                class="header-right-button-item-svg centered-container"
                style="display: none"
              >
                <path
                  d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 632H136v-39.9l138.5-164.3 150.1 178L658.1 489 888 761.6V792zm0-129.8L664.2 396.8c-3.2-3.8-9-3.8-12.2 0L424.6 666.4l-144-170.7c-3.2-3.8-9-3.8-12.2 0L136 652.7V232h752v430.2zM304 456a88 88 0 1 0 0-176 88 88 0 0 0 0 176zm0-116c15.5 0 28 12.5 28 28s-12.5 28-28 28-28-12.5-28-28 12.5-28 28-28z"
                ></path>
              </svg>
            </div>
            <div class="header-right-button-item">
              <svg
                viewBox="64 64 896 896"
                data-icon="file"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                class="header-right-button-item-svg centered-container"
                style="display: none"
              >
                <path
                  d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0 0 42 42h216v494z"
                ></path>
              </svg>
            </div>
            <div class="header-right-button-item">
              <svg
                viewBox="64 64 896 896"
                data-icon="poweroff"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                class="header-right-button-item-svg centered-container"
                @click.capture="controlSingleLogoutEnable()"
              >
                <path
                  d="M705.6 124.9a8 8 0 0 0-11.6 7.2v64.2c0 5.5 2.9 10.6 7.5 13.6a352.2 352.2 0 0 1 62.2 49.8c32.7 32.8 58.4 70.9 76.3 113.3a355 355 0 0 1 27.9 138.7c0 48.1-9.4 94.8-27.9 138.7a355.92 355.92 0 0 1-76.3 113.3 353.06 353.06 0 0 1-113.2 76.4c-43.8 18.6-90.5 28-138.5 28s-94.7-9.4-138.5-28a353.06 353.06 0 0 1-113.2-76.4A355.92 355.92 0 0 1 184 650.4a355 355 0 0 1-27.9-138.7c0-48.1 9.4-94.8 27.9-138.7 17.9-42.4 43.6-80.5 76.3-113.3 19-19 39.8-35.6 62.2-49.8 4.7-2.9 7.5-8.1 7.5-13.6V132c0-6-6.3-9.8-11.6-7.2C178.5 195.2 82 339.3 80 506.3 77.2 745.1 272.5 943.5 511.2 944c239 .5 432.8-193.3 432.8-432.4 0-169.2-97-315.7-238.4-386.7zM480 560h64c4.4 0 8-3.6 8-8V88c0-4.4-3.6-8-8-8h-64c-4.4 0-8 3.6-8 8v464c0 4.4 3.6 8 8 8z"
                ></path>
              </svg>
              <div
                style="top:32px;right:32px;width:70px;"
                class="popout-menubar"
                v-if="singleLogoutEnabled"
                @click.stop="singleLogoutEnabled=false"
                v-once
              >
                <div class="centered-container" style="position:fixed;z-index:-1" @click.stop="singleLogoutEnabled=false"></div>
                <div class="popout-menubar-item" @click.self="logoutSession(activeSessionId, 0)">注销会话</div>
                <!-- <div class="popout-menubar-item" @click.self="timingLogoutEnabled=true;">定时注销</div> -->
              </div>
            </div>
            <div class="header-right-button-item" style="position:relative;">
              <div
                class="centered-container"
                :style="{height:'10px', width:'10px', 'border-radius':'50%', 'background-color': activeSessionBox.onlineStatus?'green':'red'}"
              ></div>
            </div>
          </div>
        </div>
        <div
          class="new-come-message notification-message"
          style="margin: 0 auto;"
          v-if="activeSessionId!==null"
        >
          <div
            class="disable-text-select"
            v-if="lastMessage!==null"
            @click="lastMessageClicked()"
          >{{aslList.find((x)=>x.token===lastMessage.token)?
             aslList.find((x)=>x.token===lastMessage.token).originalToken:''}}:{{lastMessage | lastMessageRepresentation}}</div>
        </div>
        <div
          class="message-display-area"
          v-for="box in sessionBox"
          :key="box.sessionId"
          v-if="box.sessionId===activeSessionId"
        >
          <div class="message-display-box">
            <div class="online-message-area" v-for="(msg,index) in box.onlineMsg" :key="index">
              <div v-if="msg.type!=='notification'" style="display: flex;">
                <div
                  class="user-avatar disable-text-select"
                  :style="{'background': msg.source==='itself'?box.themeColor:'yellow'}"
                >
                  <p style="font-size: 18px;font-weight: bolder;" v-if="msg.source==='itself'">我</p>
                </div>
                <!--div style="margin-right: 10px;position: relative;">
                  <svg t="1559734944959" @click.stop="msg.showControl=true" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" p-id="4112" width="16" height="16">
                    <path d="M592 272c0-44.004-35.996-80-80-80s-80 35.996-80 80 35.996 80 80 80 80-35.996 80-80z m0 480c0-44.004-35.996-80-80-80s-80 35.996-80 80 35.996 80 80 80 80-35.996 80-80z m0-240c0-44.004-35.996-80-80-80s-80 35.996-80 80 35.996 80 80 80 80-35.996 80-80z" p-id="4113" fill="#515151"></path>
                  </svg>
                  <div class="popout-menubar" v-if="msg.showControl">
                    <div class="popout-menubar-item" @click="deleteSingleOnlineMsg(msg.msgCount)">删除消息</div>
                    <div class="centered-container" style="position:fixed;z-index:-1" @click="$set(msg, 'showControl', false)">
                  </div>
                  </div>
                </div-->
                <div style="display:flex;flex:1 0 auto" :style="{width: msg.type==='file'?'206px':'unset'}" 
                     @mousedown.capture.stop="msgControlClicked($event, msg)">
                  <!-- 消息控制菜单 -->
                  <div class="popout-menubar" v-if="msg.showControl">
                    <div class="popout-menubar-item" @click="deleteSingleOnlineMsg(msg.msgCount)">删除消息</div>
                    <div class="centered-container" style="position:fixed;z-index:-1" @click="$set(msg, 'showControl', false)">
                  </div>
                  </div>
                  <div class="chat-message-text chat-message emoji-display" v-if="msg.type==='text'">{{msg.content}}</div>
                  <div class="chat-message chat-message-file" v-else-if="msg.type==='file'" style="position: relative">
                    <svg t="1558740860889" @click.stop="cancelFileUpload(msg.msgCount)" v-if="msg.uploadPercentage"
                       style="position: absolute;top:0;right:0;width: 13px;height:13px"
                       viewBox="0 0 1024 1024" version="1.1" p-id="1672" width="16" height="16">
                      <path d="M512 128c211.2 0 384 172.8 384 384s-172.8 384-384 384-384-172.8-384-384 172.8-384 384-384m0-64C262.4 64 64 262.4 64 512s198.4 448 448 448 448-198.4 448-448-198.4-448-448-448z" fill="#d81e06" p-id="1673"></path>
                      <path d="M646.4 332.8L512 467.2 377.6 332.8c-12.8-12.8-32-12.8-44.8 0s-12.8 32 0 44.8L467.2 512l-134.4 134.4c-12.8 12.8-12.8 32 0 44.8s32 12.8 44.8 0L512 556.8l134.4 134.4c12.8 12.8 32 12.8 44.8 0s12.8-32 0-44.8L556.8 512l134.4-134.4c12.8-12.8 12.8-32 0-44.8s-32-12.8-44.8 0z" fill="#d81e06" p-id="1674"></path>
                    </svg>
                    <div class="chat-message-file-shadow" :style="{width: msg.uploadPercentage+'%'}" v-if="msg.uploadPercentage">
                      <div style="position: relative">
                        <p class="chat-message-progress-text" style="bottom:0;right:-25px">{{msg.uploadPercentage+'%'}}</p>
                      </div>
                    </div>
                    <div class="file-message-avatar text-overflow-truncate">{{msg.content.fileName | getExtnameFromFilename(msg.content.fileType)}}</div>
                    <div class="file-message-description">
                      <div
                        :title="msg.content.fileName"
                        class="file-message-description-item text-overflow-truncate"
                      >{{msg.content.fileName}}</div>
                      <div
                        class="file-message-description-item"
                        style="color: blueviolet;font-size: 11px"
                      >{{msg.content.fileSize | fileSizeRepresentation}}</div>
                    </div>
                    <div class="file-message-download-button">
                      <a v-if="msg.content.url!==null"
                        :href="msg.content.url+ '?download=true'"
                        :download="msg.content.name"
                        target="blank"
                      >
                        <svg
                          viewBox="64 64 896 896"
                          data-icon="download"
                          width="1em"
                          height="1em"
                          fill="currentColor"
                          aria-hidden="true"
                          class="centered-container"
                        >
                          <path
                            data-v-28e45d44
                            d="M505.7 661a8 8 0 0 0 12.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9h-74.1V168c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v338.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.8zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"
                          ></path>
                        </svg>
                      </a>
                      <svg v-else-if="msg.successUpload===false" t="1557378238264" class="centered-container" style="height: 14px;" viewBox="0 0 1024 1024" version="1.1" p-id="1095" width="16" height="16">
                        <path d="M512.004 2C230.346 2 2 230.339 2 511.996 2 793.66 230.34 1022 512.004 1022 793.66 1022 1022 793.66 1022 511.996 1022 230.346 793.66 2 512.004 2z m0 771.896c-22.827 0-41.352-18.529-41.352-41.355 0-22.827 18.524-41.357 41.352-41.357 22.832 0 41.35 18.53 41.35 41.357 0 22.851-18.518 41.355-41.35 41.355z m41.35-206.77c0 22.839-18.518 41.356-41.35 41.356-22.827 0-41.352-18.518-41.352-41.356V291.453c0-22.82 18.524-41.352 41.352-41.352 22.832 0 41.35 18.531 41.35 41.352v275.673z m0 0" fill="#E73E45" p-id="1096"></path>
                      </svg>
                    </div>
                  </div>  
                  <div class="chat-message-image chat-message" v-else-if="msg.type==='image'">
                    <div class="popout-window-area" v-if="msg.showDetail===true" @click.self="msg.showDetail=false">
                      <img class="centered-container"
                           :src="msg.content.url" style="max-width: 80%;max-height: 80%;">
                    <!--svg v-if="msg.showDel===true" 
                    @mouseenter="$set(msg, 'showDel', true)"  @mouseleave="$set(msg, 'showDel', false)"
                    @click="$set(msg, 'showDetail', false)" class="centered-container" t="1558740860889" viewBox="0 0 1024 1024" version="1.1" p-id="1672" width="64" height="64">
                      <path d="M512 128c211.2 0 384 172.8 384 384s-172.8 384-384 384-384-172.8-384-384 172.8-384 384-384m0-64C262.4 64 64 262.4 64 512s198.4 448 448 448 448-198.4 448-448-198.4-448-448-448z" fill="#d81e06" p-id="1673"></path>
                      <path d="M646.4 332.8L512 467.2 377.6 332.8c-12.8-12.8-32-12.8-44.8 0s-12.8 32 0 44.8L467.2 512l-134.4 134.4c-12.8 12.8-12.8 32 0 44.8s32 12.8 44.8 0L512 556.8l134.4 134.4c12.8 12.8 32 12.8 44.8 0s12.8-32 0-44.8L556.8 512l134.4-134.4c12.8-12.8 12.8-32 0-44.8s-32-12.8-44.8 0z" fill="#d81e06" p-id="1674"></path>
                    </svg-->
                    </div>
                    <div class="chat-message-image-shadow" 
                      :style="{height: msg.uploadPercentage + '%'}"
                      v-if="msg.uploadPercentage">
                      <div style="position: relative">
                        <p class="chat-message-progress-text" style="top:0;right:-25px">{{msg.uploadPercentage+'%'}}</p>
                      </div>
                    </div>  
                    <img
                      :src="msg.content.url"
                      style="height: 100%;border-radius: 4px"
                      @click="$set(msg, 'showDetail', true)"
                    >
                  </div>
                  <div v-else-if="msg.type==='voice'" style="align-self:center">
                  <audio controls class="chat-message chat-message-voice">
                    <source :src="msg.content | voiceRepresentation">
                  </audio>
                </div>
                </div>
                <div style="position: relative">
                  <div class="message-send-time"
                  >{{msg.sendTime | timeRepresentation}}</div>
                  <div class="message-send-status-icon" v-if="msg.source==='itself'">
                    <!-- 消息成功送达时显示 -->
                    <svg t="1557297425134" class="centered-container" style="height:11px" v-if="msg.sendStatus==='peerArrival'" viewBox="0 0 1024 1024" p-id="4347" width="16" height="16">
                      <path d="M1024 518.320172C1024 794.778151 794.778151 1024 505.679828 1024 229.221849 1024 0 794.778151 0 518.320172 0 229.221849 229.221849 0 505.679828 0 794.778151 0 1024 229.221849 1024 518.320172zM257.899355 545.753462l167.836903 173.700129a5.466839 5.466839 0 0 0 7.757075 0.099097l364.043011-358.267871a5.411785 5.411785 0 0 0-0.011011-7.75157l-21.751742-21.481978a6.188043 6.188043 0 0 0-8.136946-0.385377l-333.857032 278.131613c-2.279226 1.893849-6.155011 2.003957-8.566366 0.154151L288.057806 504.832a5.389763 5.389763 0 0 0-7.646967 1.123097L257.354323 537.324731a6.716559 6.716559 0 0 0 0.550537 8.428731z" fill="#09BB07" p-id="4348"></path>
                    </svg>
                    <!-- 消息发送失败时显示 -->
                    <svg t="1557378238264" class="centered-container" style="height:11px" v-else-if="msg.sendStatus==='sendError'" viewBox="0 0 1024 1024" version="1.1" p-id="1095" width="16" height="16">
                      <path d="M512.004 2C230.346 2 2 230.339 2 511.996 2 793.66 230.34 1022 512.004 1022 793.66 1022 1022 793.66 1022 511.996 1022 230.346 793.66 2 512.004 2z m0 771.896c-22.827 0-41.352-18.529-41.352-41.355 0-22.827 18.524-41.357 41.352-41.357 22.832 0 41.35 18.53 41.35 41.357 0 22.851-18.518 41.355-41.35 41.355z m41.35-206.77c0 22.839-18.518 41.356-41.35 41.356-22.827 0-41.352-18.518-41.352-41.356V291.453c0-22.82 18.524-41.352 41.352-41.352 22.832 0 41.35 18.531 41.35 41.352v275.673z m0 0" fill="#E73E45" p-id="1096"></path>
                    </svg>
                    <!-- 消息发送中显示 -->
                    <svg t="1557378363995" class="centered-container" style="height:11px" v-else-if="msg.sendStatus==='serverArrival'" viewBox="0 0 1024 1024" version="1.1" p-id="1744" width="16" height="16">
                      <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#62AE25" p-id="1745"></path><path d="M256 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#FFFFFF" p-id="1746"></path><path d="M512 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#FFFFFF" p-id="1747"></path><path d="M768 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#FFFFFF" p-id="1748"></path>
                    </svg>
                    <!-- 消息已离线显示 -->
                    <svg t="1557926784715" class="centered-container" style="height:11px" v-else-if="msg.sendStatus==='offlined'" viewBox="0 0 1024 1024" version="1.1" p-id="531" width="16" height="16">
                      <path d="M510.54537 63.813375c-246.711961 0-446.711018 199.999057-446.711018 446.711017 0 246.709915 199.999057 446.707948 446.711018 446.707948 246.709915 0 446.707948-199.998033 446.707948-446.707948 0-246.711961-199.998033-446.711018-446.707948-446.711017z m164.058497 524.863982L543.330054 719.951169c-13.725606 13.758352-33.892925 16.980743-50.738591 9.866718-0.571005-0.201591-0.940418-0.704035-1.5104-0.939395-5.671163-2.281973-11.040451-5.638417-15.638165-10.234085L345.008196 588.207659c-18.020422-18.019399-18.020422-47.248094 0-65.234747 17.986653-18.020422 47.214325-18.020422 65.199955 0l54.262858 54.229089V331.160305c0-24.697495 19.998473-44.698015 44.663222-44.698014 24.698518 0 44.698015 19.999496 44.698015 44.698014v247.047606l55.134714-55.168484c18.120706-18.121729 47.517223-18.121729 65.63793 0 18.11866 18.120706 18.11866 47.518247-0.001023 65.63793z" fill="#2c2c2c" p-id="532"></path>
                    </svg>
                    <!-- 消息还未发送显示 -->
                    <svg t="1558833606175" class="centered-container" style="height:11px" v-else-if="msg.sendStatus==='initial'" viewBox="0 0 1024 1024" version="1.1" p-id="4493" width="16" height="16">
                      <path d="M512 76.8c243.2 0 435.2 198.4 435.2 435.2S748.8 947.2 512 947.2 76.8 755.2 76.8 512 268.8 76.8 512 76.8M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0z" fill="#34E98F" p-id="4494"></path><path d="M288 512c0 57.6 44.8 108.8 96 108.8s96-51.2 96-108.8c0-102.4 70.4-185.6 160-185.6S800 409.6 800 512h-70.4c0-57.6-44.8-108.8-96-108.8-44.8 0-89.6 51.2-89.6 108.8 0 102.4-70.4 185.6-160 185.6S224 614.4 224 512h64z" fill="#34E98F" p-id="4495"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div v-else class="notification-message" v-once>{{msg.content}}</div>
            </div>
            <div style="0 0 10px"></div>
          </div>
          <div class="offline-message-area" v-if="box.offlineMsg.length!==0">
            <div class="offline-message-display-area">
              <div
                class="offline-chat-message-area"
                v-for="(msg,index) in box.offlineMsg"
                :key="index"
              >
                <div class="offline-message-description">{{msg.sendTime | timeRepresentation}}</div>
                <div class="chat-message chat-message-text emoji-display" v-if="msg.type==='text'">
                  <p>{{msg.content}}</p>
                </div>
                <div class="chat-message chat-message-file" v-else-if="msg.type==='file'">
                  <div class="file-message-avatar text-overflow-truncate">{{msg.content.fileName | getExtnameFromFilename(msg.content.fileType)}}</div>
                  <div class="file-message-description">
                    <div class="file-message-description-item text-overflow-truncate">{{msg.content.fileName}}</div>
                    <div class="file-message-description-item"
                    style="color: blueviolet;font-size: 11px">{{msg.content.fileSize | fileSizeRepresentation}}</div>
                  </div>
                  <div class="file-message-download-button">
                    <a
                      :href="msg.content.url+ '?download=true'"
                      :download="msg.content.name"
                      target="blank"
                    >
                    <svg
                      style="position: relative;top: 6px;left: 7px;"
                      viewBox="64 64 896 896"
                      data-icon="download"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      aria-hidden="true"
                      class
                    >
                      <path
                        d="M505.7 661a8 8 0 0 0 12.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9h-74.1V168c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v338.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.8zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"
                      ></path>
                    </svg></a>
                  </div>
                </div>
                <div class="chat-message chat-message-image" v-else-if="msg.type==='image'">
                  <img
                    :src="msg.content.url"
                    style="height: 100%;width: 100%;border-radius: 4px"
                  >
                </div>
                <div v-else-if="msg.type==='voice'">
                  <audio controls class="chat-message-voice">
                    <source :src="'data:audio/mp3;base64,' + msg.content">
                  </audio>
                </div>
                <div class="close-single-offline-button" 
                     @click.stop="deleteSingleOfflineMsg(index, msg.msgId)">
                  <svg
                    viewBox="64 64 896 896"
                    data-icon="close"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                    class
                    style="position: absolute;margin: auto;top: 0;right: 0;bottom: 0;left: 0;"
                  >
                    <path
                      d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div class="offline-chat-message-area">
                <div class="offline-message-description"></div>
              </div>
            </div>
            <div class="clear-all-offline-area">
              <div class="clear-all-offline-button"
                   @click.stop="deleteAllOfflineMsg()">
                <svg
                  style="position:relative;left:8px;top:2px;"
                  viewBox="64 64 896 896"
                  data-icon="close"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                  class
                >
                  <path
                    d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div
          class="message-manipulation-area"
          :class="{'disable-select-area': activeSessionId===null}"
        >
          <div class="message-manipulation-button-group" style="display:none">
            <div class="message-manipulation-button">
              <svg
                class="message-manipulation-button-svg centered-container"
                viewBox="64 64 896 896"
                data-icon="right"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"
                ></path>
              </svg>
            </div>
            <div class="message-manipulation-button">
              <svg
                class="message-manipulation-button-svg centered-container"
                viewBox="64 64 896 896"
                data-icon="fullscreen-exit"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M391 240.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L200 146.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L280 333.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L401 410c5.1.6 9.5-3.7 8.9-8.9L391 240.9zm10.1 373.2L240.8 633c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L146.3 824a8.03 8.03 0 0 0 0 11.3l42.4 42.3c3.1 3.1 8.2 3.1 11.3 0L333.7 744l43.7 43.7A8.01 8.01 0 0 0 391 783l18.9-160.1c.6-5.1-3.7-9.4-8.8-8.8zm221.8-204.2L783.2 391c6.6-.8 9.4-8.9 4.7-13.6L744 333.6 877.7 200c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.3a8.03 8.03 0 0 0-11.3 0L690.3 279.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L614.1 401c-.6 5.2 3.7 9.5 8.8 8.9zM744 690.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L623 614c-5.1-.6-9.5 3.7-8.9 8.9L633 783.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L824 877.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L744 690.4z"
                ></path>
              </svg>
            </div>
            <div class="message-manipulation-button">
              <svg
                class="message-manipulation-button-svg centered-container"
                viewBox="0 0 1024 1024"
                width="16"
                height="16"
              >
                <path
                  d="M1024 510.997333a36.565333 36.565333 0 0 0-73.152 0.149334V512c0 242.368-196.48 438.848-438.848 438.848S73.152 754.368 73.152 512 269.632 73.152 512 73.152c146.837333 0 276.821333 72.106667 356.48 182.848h-63.914667a36.565333 36.565333 0 0 0 0 73.152h128c20.202667 0 36.586667-16.384 36.586667-36.586667V128A36.565333 36.565333 0 1 0 896 128v45.354667C802.176 67.050667 664.917333 0 512 0 229.226667 0 0 229.226667 0 512s229.226667 512 512 512 512-229.226667 512-512v-1.002667z"
                  fill="#2c2c2c"
                  p-id="4135"
                ></path>
                <path
                  d="M749.717333 548.565333c0-20.181333-16.384-36.565333-36.565333-36.565333H512v-201.152a36.565333 36.565333 0 1 0-73.152 0v237.717333c0 20.202667 16.384 36.586667 36.586667 36.586667h237.717333c20.181333 0 36.565333-16.384 36.565333-36.586667z"
                  fill="#2c2c2c"
                  p-id="4136"
                ></path>
              </svg>
            </div>
            <div class="message-manipulation-button">
              <svg
                class="message-manipulation-button-svg centered-container"
                viewBox="64 64 896 896"
                data-icon="swap"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M847.9 592H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h605.2L612.9 851c-4.1 5.2-.4 13 6.3 13h72.5c4.9 0 9.5-2.2 12.6-6.1l168.8-214.1c16.5-21 1.6-51.8-25.2-51.8zM872 356H266.8l144.3-183c4.1-5.2.4-13-6.3-13h-72.5c-4.9 0-9.5 2.2-12.6 6.1L150.9 380.2c-16.5 21-1.6 51.8 25.1 51.8h696c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"
                ></path>
              </svg>
            </div>
          </div>
          <div class="message-input-field">
            <!--disabled是一个属性,不是一个样式-->
            <input
              type="text"
              v-model="inputBoxContent"
              :disabled="activeSessionId===null"
              class="bottom-input-box emoji-display"
              @keypress.enter="sendTextMsg(inputBoxContent)"
            >
            <svg
              t="1555679611396"
              class="icon"
              style="position: absolute;right: 2px;top:0;bottom:0;margin:auto"
              version="1.1"
              width="32"
              height="32"
              viewBox="0 0 1024 1024"
              @click="sendTextMsg(inputBoxContent)"
            >
              <path
                d="M209.147414 868.00618 275.192619 574.558801 666.705478 542.05348 666.759713 538.086122 275.983635 516.187369 217.867006 224.450958 865.381399 537.411763Z"
                p-id="1277"
                fill="#14ea9b"
                style
              ></path>
            </svg>
          </div>
          <div class="message-manipulation-button-group">
            <div class="message-manipulation-button" @click="controlEmojiEnabled()">
              <svg
                class="message-manipulation-button-svg centered-container"
                viewBox="64 64 896 896"
                data-icon="smile"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M288 421a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm352 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0zM512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm263 711c-34.2 34.2-74 61-118.3 79.8C611 874.2 562.3 884 512 884c-50.3 0-99-9.8-144.8-29.2A370.4 370.4 0 0 1 248.9 775c-34.2-34.2-61-74-79.8-118.3C149.8 611 140 562.3 140 512s9.8-99 29.2-144.8A370.4 370.4 0 0 1 249 248.9c34.2-34.2 74-61 118.3-79.8C413 149.8 461.7 140 512 140c50.3 0 99 9.8 144.8 29.2A370.4 370.4 0 0 1 775.1 249c34.2 34.2 61 74 79.8 118.3C874.2 413 884 461.7 884 512s-9.8 99-29.2 144.8A368.89 368.89 0 0 1 775 775zM664 533h-48.1c-4.2 0-7.8 3.2-8.1 7.4C604 589.9 562.5 629 512 629s-92.1-39.1-95.8-88.6c-.3-4.2-3.9-7.4-8.1-7.4H360a8 8 0 0 0-8 8.4c4.4 84.3 74.5 151.6 160 151.6s155.6-67.3 160-151.6a8 8 0 0 0-8-8.4z"
                ></path>
              </svg>
            </div>
            <!--图片上传按钮-->
            <div class="message-manipulation-button">
              <input
                type="file"
                class="centered-container"
                @change="sendImageMsg($event)"
                style="height: 32px;width:32px;z-index:1;font-size: 0;opacity:0"
                accept="image/*"
              >
              <svg
                class="message-manipulation-button-svg centered-container"
                viewBox="64 64 896 896"
                data-icon="picture"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 632H136v-39.9l138.5-164.3 150.1 178L658.1 489 888 761.6V792zm0-129.8L664.2 396.8c-3.2-3.8-9-3.8-12.2 0L424.6 666.4l-144-170.7c-3.2-3.8-9-3.8-12.2 0L136 652.7V232h752v430.2zM304 456a88 88 0 1 0 0-176 88 88 0 0 0 0 176zm0-116c15.5 0 28 12.5 28 28s-12.5 28-28 28-28-12.5-28-28 12.5-28 28-28z"
                ></path>
              </svg>
            </div>
            <!--文件上传按钮-->
            <div class="message-manipulation-button">
              <input
                type="file"
                class="centered-container"
                @change="sendFileMsg($event)"
                style="height: 32px;width:32px;z-index:1;font-size: 0;opacity:0"
              >
              <svg
                class="message-manipulation-button-svg centered-container"
                viewBox="64 64 896 896"
                data-icon="file"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0 0 42 42h216v494z"
                ></path>
              </svg>
            </div>
            <!--录音按钮-->
            <div class="message-manipulation-button" @click.stop="recordClicked()">
              <!--录音按钮菜单-->
              <div class="popout-menubar record-menubar" v-if="recordEnabled">
                <!--取消录音按钮-->
                <div
                  class="popout-menubar-item record-menubar-item"
                  @click.stop="cancelRecordClicked()"
                >
                  <svg
                    t="1555903111030"
                    class="centered-container"
                    viewBox="0 0 1024 1024"
                    p-id="1107"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M511.95904 0C229.66272 0 0 229.6832 0 512s229.66272 512 511.95904 512C794.29632 1024 1024 794.3168 1024 512S794.29632 0 511.95904 0z m0 922.64448C285.53216 922.64448 101.3248 738.42688 101.3248 512S285.53216 101.35552 511.95904 101.35552c226.43712 0 410.65472 184.2176 410.65472 410.64448s-184.2176 410.64448-410.65472 410.64448z"
                      fill="#00DBC6"
                      p-id="1108"
                    ></path>
                    <path
                      d="M760.5248 328.58112a54.19008 54.19008 0 0 0-16.71168-39.50592 57.15968 57.15968 0 0 0-40.192-16.25088c-14.9504 0-29.07136 5.61152-39.75168 15.80032L517.888 427.4176l-143.6672-138.55744a57.37472 57.37472 0 0 0-40.01792-16.03584c-15.03232 0-29.184 5.67296-39.84384 15.95392a54.4256 54.4256 0 0 0-16.97792 39.48544 54.40512 54.40512 0 0 0 16.87552 39.50592l142.20288 137.08288-143.47264 136.40704a54.56896 54.56896 0 0 0-17.152 39.46496 54.40512 54.40512 0 0 0 16.73216 39.54688 57.32352 57.32352 0 0 0 40.20224 16.18944 57.62048 57.62048 0 0 0 39.75168-15.72864l144.83456-137.74848L663.552 724.0192a57.1392 57.1392 0 0 0 39.99744 16.0256 57.2416 57.2416 0 0 0 39.89504-15.94368 54.29248 54.29248 0 0 0 17.00864-39.41376 54.41536 54.41536 0 0 0-16.87552-39.58784l-144.7936-139.63264 144.52736-137.45152a54.33344 54.33344 0 0 0 17.21344-39.43424z"
                      fill="#00DBC6"
                      p-id="1109"
                    ></path>
                  </svg>
                </div>
                <!--暂停/继续录音按钮-->
                <!--div class="popout-menubar-item record-menubar-item">
                  <svg
                    t="1557233829505"
                    class="centered-container"
                    viewBox="0 0 1024 1024"
                    p-id="8810"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512-230.4-512-512-512zM409.6 684.8c0 25.6-19.2 51.2-51.2 51.2-25.6 0-51.2-19.2-51.2-51.2V339.2c0-25.6 19.2-51.2 51.2-51.2 25.6 0 51.2 19.2 51.2 51.2v345.6z m300.8 0c0 25.6-19.2 51.2-51.2 51.2-25.6 0-51.2-19.2-51.2-51.2V339.2c0-25.6 19.2-51.2 51.2-51.2 25.6 0 51.2 19.2 51.2 51.2v345.6z"
                      fill="#00A4FF"
                      p-id="8811"
                    ></path>
                  </svg>
                </div-->
                <!--停止录音按钮-->
                <div
                  class="popout-menubar-item record-menubar-item"
                  @click.stop="stopRecordClicked()"
                >
                  <svg
                    t="1557233734449"
                    class="centered-container"
                    viewBox="0 0 1030 1024"
                    version="1.1"
                    p-id="4412"
                    width="16.09375"
                    height="16"
                  >
                    <path
                      d="M515.065868 49.053892C257.532934 49.053892 49.053892 251.401198 49.053892 515.065868c0 257.532934 208.479042 466.011976 466.011976 466.011976 257.532934 0 466.011976-208.479042 466.011976-466.011976S772.598802 49.053892 515.065868 49.053892z m177.82036 643.832336H337.245509V337.245509h355.640719v355.640719z"
                      fill="#EF5552"
                      p-id="4413"
                    ></path>
                    <path
                      d="M515.065868 12.263473C233.005988 12.263473 12.263473 233.005988 12.263473 515.065868c0 275.928144 226.874251 502.802395 502.802395 502.802395s502.802395-226.874251 502.802395-502.802395c0-275.928144-226.874251-502.802395-502.802395-502.802395z m0 956.550898C263.664671 968.814371 61.317365 766.467066 61.317365 515.065868 61.317365 257.532934 257.532934 61.317365 515.065868 61.317365c251.401198 0 453.748503 202.347305 453.748503 453.748503s-202.347305 453.748503-453.748503 453.748503z"
                      fill="#B91A17"
                      p-id="4414"
                    ></path>
                  </svg>
                </div>
                <!--发送语音消息-->
                <div
                  class="popout-menubar-item record-menubar-item"
                  @click.stop="sendRecordClicked()"
                >
                  <svg
                    t="1557233921618"
                    class="centered-container"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    p-id="13826"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M511.969301 0c-282.72006 0-511.947811 229.158167-511.947811 511.99693 0 282.72006 229.228775 511.960091 511.947811 511.960091 282.779412 0 512.00921-229.240031 512.00921-511.960091C1023.978511 229.158167 794.750759 0 511.969301 0L511.969301 0 511.969301 0zM415.669024 780.958638 415.669024 657.355529l74.697259 21.508873L415.669024 780.958638 415.669024 780.958638 415.669024 780.958638zM649.743154 692.258457l-226.894613-70.098521L625.417119 383.077745 364.043227 605.01137l-212.222449-64.294328 614.803387-297.720705L649.743154 692.258457 649.743154 692.258457 649.743154 692.258457z"
                      fill="#1296db"
                      p-id="13827"
                    ></path>
                  </svg>
                </div>
              </div>
              <svg
                class="message-manipulation-button-svg centered-container"
                viewBox="0 0 1024 1024"
                width="16"
                height="16"
              >
                <path
                  d="M801.052382 512.415662a51.158434 51.158434 0 0 0-46.04259 32.741398 255.792169 255.792169 0 0 1-483.447199 0A51.158434 51.158434 0 0 0 226.543171 512.415662a51.158434 51.158434 0 0 0-51.158434 65.482796 315.647536 315.647536 0 0 0 12.789609 33.764566 358.109036 358.109036 0 0 0 250.164741 200.029476 25.579217 25.579217 0 0 1 20.974958 25.067632v59.343784a25.579217 25.579217 0 0 1-25.579217 25.579216H359.555099a51.158434 51.158434 0 0 0 0 102.316868h306.950602a51.158434 51.158434 0 0 0 0-102.316868H589.768051a25.579217 25.579217 0 0 1-25.579217-25.579216v-59.343784a25.579217 25.579217 0 0 1 20.463373-25.067632 358.109036 358.109036 0 0 0 250.164741-200.029476c4.604259-9.720102 8.696934-21.998127 12.789609-33.764566a51.158434 51.158434 0 0 0-46.554175-65.482796z"
                  fill="#000000"
                  p-id="7688"
                ></path>
                <path
                  d="M513.0304 614.73253a204.633735 204.633735 0 0 0 204.633735-204.633735V205.46506a204.633735 204.633735 0 0 0-223.050771-204.633735A211.795916 211.795916 0 0 0 308.396665 216.208331V410.098795a204.633735 204.633735 0 0 0 204.633735 204.633735z"
                  fill="#000000"
                  p-id="7689"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <div class="emoji-selection-area emoji-display" v-if="emojiEnabled">
          <div
            class="single-emoji-selection-area disable-text-select"
            v-for="(emoji,index) in emojis"
            @click="inputBoxContent+=emoji.entity"
            v-once
            :key="index"
            :title="emoji.name"
          >{{emoji.entity}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emojis from "../../static/resources/emoji";
import {
  cancelRecord,
  startRecord,
  stopRecord,
  getRecordData
} from "../browser/record";

export default {
  name: "chat-home",
  data: function() {
    return {
      isMobileView: window.innerHeight / window.innerWidth >= 1,
      mobileMainView: true,
      inputBoxContent: "",
      singleLogoutEnabled: false,
      logoutAllEnabled: false,
      recordEnabled: false,
      emojiEnabled: false,
      timingLogoutEnabled: false,
      globalLogoutTimer: null, // timerId, initialTime
      sessionBox: [],
      aslList: [],
      waitingLogout: [], // sessionId, timerId
      activeSessionId: null,
      emojis: emojis,
      lastMessage: null,
      msgCount: 0
    };
  },
  methods: {
    sendTextMsg(msgText) {
      if (msgText !== "") {
        let msg = {
          userId: this.$store.state.userId,
          sessionId: this.activeSessionId,
          token: this.activeSessionBox.token,
          type: "text",
          content: msgText,
          source: "itself",
          sendTime: new Date(),
          msgCount: this.msgCount++
        };
        this.inputBoxContent = "";
        this.activeSessionBox.onlineMsg.push(msg);
        // 添加断线判断
        this.handleSendStatus(msg);
      }
    },
    sendFileMsg(event) {
      let file = event.target.files[0];
      if(file===undefined) return ; // 取消选择文件
      let formData = new FormData();
      formData.append("file", file);
      formData.append("token", this.activeSessionBox.token);

      let s = this.$ajax.CancelToken.source();
      let msg = {
        userId: this.$store.state.userId,
        sessionId: this.activeSessionId,
        token: this.activeSessionBox.token,
        type: "file",
        content: {
          url: null,
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type
        },
        source: "itself",
        uploadPercentage: 0,
        sendTime: new Date(),
        msgCount: this.msgCount++,
        cancelSource: s
      };
      this.activeSessionBox.onlineMsg.push(msg);
      this.$ajax
        .post("/upload", formData, {
          onUploadProgress: function(progressEvent) {
            if (progressEvent.lengthComputable) {
              msg.uploadPercentage = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              );
            }
          },
          cancelToken: s.token
        })
        .then(res => {
          this.$delete(msg, 'uploadPercentage');
          this.$delete(msg, 'cancelSource');
          if (res.data.url) {
            msg.content.url = res.data.url;  
            this.handleSendStatus(msg);
            this.$set(msg, "successUpload", true);
          }
          else {this.$set(msg, "successUpload", false);}
        })
        .catch((err) => {
          if(this.$ajax.isCancel(err)){
            let i = this.activeSessionBox.onlineMsg.findIndex((x)=>x.msgCount===msg.msgCount);
            if(i!==-1)
              this.activeSessionBox.onlineMsg.splice(i, 1);
          }
          else{
            this.$set(msg, "successUpload", false);
            this.$delete(msg, 'uploadPercentage');
            this.$delete(msg, 'cancelSource');
          }
        })
    },

    sendImageMsg(event) {
      let file = event.target.files[0];
      if(file===undefined) return ;
      let fileName = file.name;

      let msg = {
        userId: this.$store.state.userId,
        sessionId: this.activeSessionId,
        token: this.activeSessionBox.token,
        type: "image",
        content: {
          url: null,
          name: fileName
        },
        source: "itself",
        uploadPercentage: 0,
        sendTime: new Date(),
        msgCount: this.msgCount++
      };

      // 如果需要把图片暂存
      let formData = new FormData();
      formData.append("file", file);
      formData.append("token", this.activeSessionBox.token);
      let fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.addEventListener("load", () => {
        msg.content.url = fileReader.result;
        this.activeSessionBox.onlineMsg.push(msg);
        this.$ajax.post("/upload", formData, {
          onUploadProgress: function(progressEvent){
            if (progressEvent.lengthComputable) {
              msg.uploadPercentage = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              );
            }
          }
        })
        .then(res => {
          this.$delete(msg, "uploadPercentage");
          if (res.data.url) {
            msg.content.url = res.data.url;
            // this.$socket.send(msg);  // socketio在此处自动将File对象转为了ArrayBuffer
            // let m = Object.assign({}, msg);
            this.handleSendStatus(msg);
            msg.content.url = fileReader.result;
            this.$set(msg, "successUpload", true);
          }
          else this.$set(msg, "successUpload", false);
        })
        .catch(() => {
          this.$set(msg, "successUpload", false);
          this.$delete(msg, "uploadPercentage");
          console.log("文件上传失败");
        })
      });
    },
    sendVoiceMsg(voiceData) {
      let msg = {
        userId: this.$store.state.userId,
        sessionId: this.activeSessionId,
        token: this.activeSessionBox.token,
        type: "voice",
        content: voiceData,
        source: "itself",
        sendTime: new Date(),
        msgCount: this.msgCount++
      };
      this.handleSendStatus(msg);
      //TODOmsg.content = window.URL.createObjectURL(msg.content);
      this.activeSessionBox.onlineMsg.push(msg);
    },
    downloadMsgFile(msg) {
      if (msg.content.url !== null) {
        let link = msg.content.url + "?download=true";
        this.$ajax
          .get(link, {
            responseType: "arraybuffer"
          })
          .then(res => {
            let a = document.createElement("a");
            let filename = "file.png";
            a.href = url;
            a.download = filename;
            a.onclick = () => {
              let blob = new Blob([res.data], { type: "*/*" });
              let url = window.URL.createObjectURL(blob);
              window.URL.revokeObjectURL(url);
            };
            a.click();
          })
          .catch(err => {
            console.log("下载出现问题");
            console.log(err);
          });
      }
    },
    cancelFileUpload(msgCount){
      let msg = this.activeSessionBox.onlineMsg.find((x)=> x.msgCount===msgCount);
      if(msg!==null){
        msg.cancelSource.cancel();
      }
    },
    resizeHandler() {
      let viewPortRatio = window.innerHeight / window.innerWidth;
      this.isMobileView = viewPortRatio >= 1;
    },
    logoutSession(sessionId, time) {
      let index = this.waitingLogout.findIndex(x => {
        return x.sessionId === sessionId;
      });
      let timerId = setTimeout(() => {
        let si = this.sessionBox.findIndex(x => {
          return x.sessionId === sessionId;
        });
        if (si !== -1) {
          this.sessionBox.splice(si, 1); // 移除sessionBox
        }
        let ai = this.aslList.findIndex(x => {
          return x.sessionId === sessionId;
        });
        let token;
        if (ai !== -1) {
          token = this.aslList[ai].token;
          this.aslList.splice(ai, 1); // 移除aslitem
        }
        this.activeSessionId = this.aslList.length>0 ? this.aslList[0].sessionId : null; // 设置sessionId
        let i = this.waitingLogout.findIndex(x => {
          return x.sessionId === sessionId;
        });
        if (i !== -1) this.waitingLogout.splice(i, 1);
        this.$store.commit('removeToken', token);
        this.$socket.emit("logoutSession", this.$store.state.userId, sessionId);
      }, time);
      if (index === -1) {
        this.waitingLogout.push({
          timerId: timerId,
          sessionId: sessionId
        });
      } else {
        window.clearTimeout(this.waitingLogout[index].timerId);
        this.waitingLogout[index].timerId = timerId;
      }
    },
    timingLogout(hour, minute, second) {
      hour = hour === "" ? 0 : parseInt(hour);
      minute = minute === "" ? 0 : parseInt(minute);
      second = second === "" ? 0 : parseInt(second);
      let milliseconds = (hour * 3600 + minute * 60 + second) * 1000;
      if (milliseconds) {
        this.globalLogout(milliseconds);
        // this.logoutSession(this.activeSessionId, milliseconds);
      }
      this.timingLogoutEnabled = false;
    },
    globalLogout(time){
      if(this.globalLogoutTimer!==null)
        clearTimeout(this.globalLogoutTimer)
      let id = setTimeout(()=>{
        this.closeWindow();
      }, time);
      this.globalLogoutTimer = {
        timerId: id,
        initialTime: time
      };
    },
    closeWindow(){
      location.replace('about:blank');
    },
    handleSendStatus(msg){
      this.$set(msg, "sendStatus", "initial");
      this.$socket.binary(true).emit("msgr", msg, data => {
          this.$set(msg, 'msgId', data.msgId);
          if(data.peerStatus)
            this.$set(msg, 'sendStatus', 'serverArrival');
          else
          {
            this.$set(msg, 'sendStatus', 'offlined');
            let session = this.sessionBox.find((x)=>x.sessionId===msg.sessionId);
            if(session!==null){
              session.onlineMsg.push({
                type: 'notification',
                content: '对方已离线,消息已被暂存'
              })
            }
          }
        });
        setTimeout(()=>{
          if(msg.sendStatus==='serverArrival'){
            setTimeout(()=>{
              if(msg.sendStatus==='serverArrival' || msg.sendStatus==='initial') 
                this.$set(msg, 'sendStatus', 'sendError');
            }, 5000)
          }
        } ,5000);
    },
    switchActiveSession(sessionId) {
      this.activeSessionId = sessionId;
      let a = this.aslList.find(x => {
        return x.sessionId === sessionId;
      });
      if (a) a.unreadCount = 0;
      if(this.isMobileView) this.mobileMainView = false;
    },
    lastMessageClicked() {
      if (this.lastMessage) {
        let a = this.aslList.findIndex(x => {
          return x.sessionId === this.lastMessage.sessionId;
        });
        if (a !== -1) this.activeSessionId = this.lastMessage.sessionId;
      }
    },
    controlSingleLogoutEnable() {
      this.singleLogoutEnabled = !this.singleLogoutEnabled;
    },
    controlLogoutAllEnabled() {
      this.logoutAllEnabled = !this.logoutAllEnabled;
    },
    controlRecordEnabled() {
      this.recordEnabled = !this.recordEnabled;
    },
    controlEmojiEnabled() {
      this.emojiEnabled = !this.emojiEnabled;
    },
    recordClicked() {
      if (this.recordEnabled) {
        stopRecord();
      } else {
        startRecord(()=>this.recordEnabled=true, ()=>this.recordEnabled=false);
      }
      this.controlRecordEnabled();
    },
    cancelRecordClicked() {
      cancelRecord();
      this.controlRecordEnabled();
    },
    stopRecordClicked() {
      stopRecord();
    },
    sendRecordClicked() {
      let data = getRecordData();
      this.sendVoiceMsg(data);
      this.controlRecordEnabled();
    },
    exitWarning(e) {
      e = e || window.event;
      // 兼容IE8和Firefox 4之前的版本
      if (e) {
        e.returnValue = "关闭提示";
      }
      // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
      return "关闭提示";
    },
    addSession(token) {
      let t1 = Math.round(Math.random()*(0xFFFFFF)).toString(16);
      let t2 = Math.round(Math.random()*(0xFFFFFF)).toString(16);
      let themeColor =  `linear-gradient(to bottom,#${t1},#${t2})`;
      this.aslList.push({
        sessionId: token.sessionId,
        token: token.hashToken,
        originalToken: token.token,
        lastMsg: null,
        unreadCount: 0,
        themeColor: themeColor
      });
      this.sessionBox.push({
        token: token.hashToken,
        originalToken: token.token,
        sessionId: token.sessionId,
        offlineMsg: [],
        onlineMsg: [],
        onlineStatus: token.peerStatus,
        themeColor: themeColor
      });
      this.activeSessionId = token.sessionId;
    },
    msgControlClicked(event, msg){
      if(event.button===2){
        this.$set(msg, 'showControl', true);
      }
    },
    deleteSingleOfflineMsg(index, msgId){
      this.activeSessionBox.offlineMsg.splice(index, 1);
      this.$socket.emit('removeOfflineMsg', 
        {ids: [msgId], sessionId: this.activeSessionId}
      );
    },
    deleteAllOfflineMsg(){
      let ids = this.activeSessionBox.offlineMsg.map((x)=>x.msgId);
      this.$socket.emit('removeOfflineMsg', 
        {ids: ids, sessionId: this.activeSessionId}
      );
      this.activeSessionBox.offlineMsg.splice(0, ids.length);
    },
    deleteSingleOnlineMsg(msgCount){
      let i = this.activeOnlineMsg.findIndex(x=>x.msgCount===msgCount);
      if(i!==-1){
        if(this.activeOnlineMsg[i].sendStatus==='offlined'){
          this.$socket.emit('removeOfflineMsg', {
            ids: [this.activeOnlineMsg[i].msgId],
            sessionId: this.activeSessionId
          });
          if(this.activeOnlineMsg[i]){
            this.activeOnlineMsg.splice(i, 2);
          }
        }
        else this.activeOnlineMsg.splice(i, 1);
      }
    },
    generateThemeColor(){

    },
    disableContextMenu(){ return false }
  },
  computed: {
    newAddToken() {
      return this.$store.state.newAddToken;
    },
    activeSessionBox() {
      return this.sessionBox.find(x => {
        return x.sessionId === this.activeSessionId;
      });
    },
    activeOnlineMsg(){
      return this.activeSessionBox?this.activeSessionBox.onlineMsg:null;
    }
  },
  watch: {
    newAddToken() {
      this.addSession(this.newAddToken);
    },
    activeOnlineMsg(){
      // 在有新消息到达时滑动到最底部
      this.$nextTick(() => {
        let container = this.$el.querySelector(".message-display-box");
        if (container !== null) {
          container.scrollTop = container.scrollHeight;
        }
      });
    },
    lastMessage(){
      setTimeout(() => {
        this.lastMessage = null;
      }, 5000); 
    }
  },
  filters: {
    unreadMsgCount: function(count) {
      return count < 99 ? count : "99+"; // 为0则不显示,小于99正常显示,大于99显示99+
    },
    // transform ArrayBuffer to base64 string
    imageRepresentation(image) {
      let binary = "";
      let bytes = new Uint8Array(image.file);
      for (let len = bytes.byteLength, i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return window.btoa(binary); // data:xxx/xxx;base64,
    },
    fileSizeRepresentation(fileSize) {
      if (fileSize < 1024) {
        return fileSize + "B";
      } else if (fileSize < 1024 ** 2) {
        return (fileSize / 1024).toFixed(1) + "KB";
      } else if (fileSize < 1024 ** 3) {
        return (fileSize / 1024 ** 2).toFixed(1) + "MB";
      } else if (fileSize < 1024 ** 4) {
        return (fileSize / 1024 ** 3).toFixed(1) + "GB";
      } else return "NAN";
    },
    getExtnameFromFilename(fileName, fileType) {
      let index = fileName.lastIndexOf(".");
      if (index > 0)
        return fileName.substring(index + 1, fileName.length).toUpperCase();
      else return "";
    },
    truncateStringRearAsEllipsis(str, targetLength) {
      if (str.length <= targetLength) return str;
      else {
        return str.substr(0, targetLength) + "...";
      }
    },
    utf16toEntities(str) {
      let patt = /[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则
      str = str.replace(patt, function(char) {
        let H, L, code;
        if (char.length === 2) {
          H = char.charCodeAt(0); // 取出高位
          L = char.charCodeAt(1); // 取出低位
          code = (H - 0xd800) * 0x400 + 0x10000 + L - 0xdc00; // 转换算法
          return "&#" + code + ";";
        } else {
          return char;
        }
      });
      return str;
    },
    voiceRepresentation(voice) {
      if(typeof voice !== "string")
        return URL.createObjectURL(new Blob([voice], {type:'audio/mp3'}));
      else return "data:audio/mp3;base64," + voice;
    },
    lastMessageRepresentation(message) {
      if (message) {
        if (message.type === "file") {
          return "[文件]" + message.content.fileName;
        } else if (message.type === "image") {
          return "[图片]" + message.content.name;
        } else if (message.type === "voice") {
          return "[语音]";
        } else return message.content;
      } else return "";
    }
  },
  created() {
    // 若要监听DOM事件需要将第三个参数设置为true
    window.addEventListener("resize", this.resizeHandler, true);
    // window.oncontextmenu = this.disableContextMenu;
    // window.addEventListener('beforeunload', this.exitWarning, true);
    this.$ajax.defaults.baseURL = this.$store.state.FSAddr;
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeHandler);
    // window.removeEventListener("contextmenu", this.disableContextMenu);
  },
  sockets: {
    msgn(msg) {
      let targetAslItem = this.aslList.find(x => {
        return x.sessionId === msg.sessionId;
      });
      let targetSessionBox = this.sessionBox.find(x => {
        return x.sessionId === msg.sessionId;
      });
      if (targetSessionBox && targetAslItem) {
        // if (msg.type === "voice") {
        //   msg.content = "data:audio/mp3;base64," + msg.content;
        // }

        msg.source = "peer";
        targetAslItem.unreadCount += 1;
        targetAslItem.lastMsg = msg;
        targetSessionBox.onlineMsg.push(msg);
        if(this.globalLogoutTimer!==null){
          this.globalLogout(this.globalLogoutTimer.initialTime);
        }
        this.lastMessage = msg;
        this.$socket.emit('ackr', {sessionId: msg.sessionId, msgId: msg.msgId, userId: msg.userId}, (acka)=>{});
      }
    },
    ackn(msg){
      let session = this.sessionBox.find(x=> x.sessionId===msg.sessionId);
      if(session){
        let m = session.onlineMsg.find(x=> x.msgId===msg.msgId);
        if(m){
          this.$set(m, 'sendStatus', 'peerArrival');
        }
      }
    }
    ,
    reconnect() {
      let tokenList = this.$store.state.tokenList.map(x=>x.hashToken)
      this.$socket.emit("restoreAllSession", tokenList);
    },
    peerStatus(response) {
      let sessionId = response.sessionId;
      let status = response.status;
      let box = this.sessionBox.find(x => {
        return x.sessionId === sessionId;
      });
      if (box !== null) {
        box.onlineStatus = status;
        let m = {
          type: 'notification',
          content: response.status?'对方已上线':'对方已离线' 
        }
        box.onlineMsg.push(m);
      }
    },
    // 需要优化
    pushOfflineMsg(msgs){
      for(let msg of msgs){
        let x = this.sessionBox.find((x)=> x.token===msg.token);
        if(x!==null){
          x.offlineMsg.push(msg);
        }
      }
    }
  }
};
</script>

<style>
@import "../assets/css/public.css";

* {
  margin: 0;
  padding: 0;
}

.popout-menubar {
  position: absolute;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  z-index: 1024;
  border-radius: 5px;
  box-shadow: 0 0 10px #cfcfcf;
  background-color: white;
  font-size: 15px;
}

.popout-menubar .popout-menubar-item {
  padding: 5px;
  cursor: default;
  color: grey;
}

.main {
  display: flex;
  display: -webkit-flex;
  align-items: stretch;
  height: 100vh;
  font-family: Avenir, "Chinese Quote", -apple-system, BlinkMacSystemFont,
    "Segoe UI", "Helvetica Neue", "Helvetica", "Microsoft Yahei", "PingFang SC",
    "Hiragino Sans GB", "WenQuanYi Micro Hei", "sans-serif";
}

.nav-bar {
  flex: 3;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  box-shadow: 0px 0.5px 10px #cfcfcf;
  border-right: #cfcfcf solid 1px;
  /* z-index: 3; */
}

.main .content-box {
  flex: 7;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
}

.nav-bar .nav-search {
  flex: 36px 0;
  position: relative;
  box-shadow: 0 0 8px #cfcfcf;
  /* z-index: 4; */
}

.nav-bar .nav-search .nav-search-input {
  width: 84%;
  border: none;
  font-size: 14px;
  position: absolute;
  top: 8px;
  bottom: 8px;
  left: 8%;
  right: 8%;
  outline: none;
}

.nav-bar .nav-list {
  flex: 1;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  overflow: auto;
  /* z-index: 3; */
}

.nav-bar .nav-list-item {
  height: 64px;
  display: flex;
  border-bottom: #cfcfcf solid 1px;
}

.nav-bar .avatar {
  margin: 16px;
  padding: 16px;
  border-radius: 50%;
  flex: 64px 0 auto;
}

.nav-bar .unread-msg-short {
  flex-grow: 1;
  word-wrap: break-word;
  word-break: break-all;
  text-align: left;
}

.nav-bar .unread-msg-short .nav-list-item-username {
  margin: 4px;
  height: 26px;
  font-weight: 500;
}

.nav-bar .unread-msg-short .nav-list-item-lately-msg {
  margin: 4px;
  height: 26px;
  color: gray;
  font-size: 13px;
  line-height: 26px;
}

.nav-bar .unread-msg-info {
  flex: 64px 0;
  text-align: center;
  font-size: 14px;
}

.nav-bar .unread-msg-info .unread-msg-number-area {
  min-height: 32px;
  position: relative;
}

.nav-bar .unread-msg-info .unread-msg-number {
  width: 26px;
  height: 15px;
  font-size: 12px;
  line-height: 15px;
  border-radius: 8px;
  color: white;
  text-align: center;
  background-color: red;
}

.nav-bar .unread-msg-info .unread-msg-time {
  min-height: 32px;
  text-align: center;
  line-height: 32px;
  font-size: 12px;
  margin: 0 6px;
}

.nav-bar .bottom-area {
  justify-content: flex-end;
  flex: 0 0 36px;
  display: flex;
  display: -webkit-flex;
  border-top: #cfcfcf solid 1px;
  box-shadow: 0 0 10px #cfcfcf;
  background-color: ghostwhite;
}

.nav-bar .bottom-area-button-area {
  flex: 0 0 36px;
  width: 36px;
  position: relative;
} 

.nav-bar .bottom-area-button-area .bottom-area-button {
  font-size: 16px;
}

.main .content-box .top-manipulation-area {
  flex: 32px 0;
  display: flex;
  display: -webkit-flex;
  border-bottom: #cfcfcf solid 1px;
  box-shadow: 0 -0.5px 10px #cfcfcf;
}

.main .content-box .top-manipulation-area .header-left-button-group {
  flex: 0 1 128px;
}

.main .content-box .top-manipulation-area .session-name {
  flex: 1 1 auto;
  text-align: center;
  line-height: 32px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 3px;
  max-height: 32px;
}

.main .content-box .top-manipulation-area .header-right-button-group {
  flex: 0 1 128px;
  display: flex;
  display: -webkit-flex;
}

.main .content-box .top-manipulation-area .header-right-button-item {
  flex: 1 0 auto;
  position: relative;
}

.main .content-box .new-come-message {
  flex: 16px 0;
}

.new-come-message:hover {
  color: blueviolet;
}

.main .content-box .message-display-area {
  flex-grow: 1;
  position: relative;
  display: flex;
}

.main .introduction-page {
  flex: 7 0 auto;
}

.main .content-box .message-display-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* z-index: 1; */
  display: flex;
  flex-direction: column;
  background-color: white;
  overflow: auto;
}

.message-display-box .online-message-area {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 10px;
}

.message-display-box .online-message-area .user-avatar {
  flex: 0 0 30px;
  height: 30px;
  margin: 10px;
  border-radius: 50%;
}

.main .content-box .message-display-area .offline-message-area {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* z-index: 1; */
  display: flex;
  flex-direction: column;
  background-color: rgba(255,255,255, 0.8);
  overflow: auto;
}

.main .content-box .offline-message-area .offline-message-display-area {
  display: flex;
  flex: 1 0 auto;
  align-items: center;
  flex-direction: column;
}

.main .content-box .offline-message-area .clear-all-offline-area {
  flex: 0 0 20px;
}

.clear-all-offline-area .clear-all-offline-button {
  width: 32px;
  height: 100%;
  margin: auto;
}

.offline-chat-message-area {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.chat-message {
  border-radius: 4px;
  box-shadow: 0 0 8px #cfcfcf;
}

.chat-message-text {
  border-radius: 5px;
  padding: 6px;
  flex: 1 0 auto;
  word-wrap: break-word;
  word-break: break-all;
  max-width: 200px;
  text-align: left;
  font-size: 14px;
  letter-spacing: 1px;
  font-weight: 500;
  align-self: center;
}

.chat-message-file {
  display: flex;
  height: 52px;
  flex: 1 0 200px;
}

.chat-message-file .chat-message-file-shadow{
  height: 100%;
  position: absolute;
  opacity: 0.5;
  background-color: mediumspringgreen;
  border-radius: inherit;
}

.chat-message-file .file-message-avatar {
  flex: 0 0 36px;
  margin: 8px;
  line-height: 36px;
  text-align: center;
  font-weight: 900;
  border-radius: 2px;
  background-color: aquamarine;
  font-size: 13px;
}

.chat-message-file .file-message-download-button {
  flex: 0 0 36px;
  margin: 8px;
  position: relative;
}

.chat-message-file .file-message-description {
  flex: 1 0 auto;
  text-align: left;
  max-width: 106px;
}

.file-message-description-item {
  padding: 5px;
  height: 50%;
  box-sizing: border-box;
  font-size: 12px;
  line-height: 18px;
}

.file-message-filesize {
  padding: 5px;
}

.chat-message-image {
  height: 128px;
  /* width: 96px; */
  flex: 1 0 auto;
  position: relative;
}

.chat-message-image .chat-message-image-shadow{
  position: absolute;
  bottom: 0;
  width: 100%;
  opacity: 0.5;
  background-color: mediumspringgreen;
  border-radius: inherit;
}

.notification-message {
  color: rgb(0, 139, 69);
  line-height: 16px;
  margin: 10px auto;
  text-align: center;
  opacity: 0.8;
  font-size: 12px;
}

.chat-message-progress-text{
  position: absolute;
  font-size: 10px;
  font-weight: 800;
  line-height: 10px;
  color: red;
}

.chat-message-voice {
  flex: 0 0 230px;
  height: 40px;
  border-radius: 5px;
  width: 230px;
  box-shadow: unset;
}

.chat-message-voice .chat-message-voice-control {
  margin: 5px;
  flex: 0 0 45px;
  position: relative;
}

.chat-message-voice .chat-message-voice-progress {
  width: 120px;
  margin: 0 10px;
  height: 2px;
}

.chat-message-voice .chat-message-voice-progress-text {
  font-size: 12px;
  float: right;
  margin: 0 15px 0 0;
  line-height: 25px;
}

.offline-chat-message-area .offline-message-description {
  flex: 1 0 60px;
  align-self: center;
  font-size: 12px;
  font-weight: 600;
  margin-right: 10px;
}

.offline-chat-message-area .close-single-offline-button {
  flex: 1 0 60px;
  position: relative;
  font-size: 14px;
}

.main .content-box .message-manipulation-area {
  flex: 36px 0;
  display: flex;
  border-top: #cfcfcf solid 1px;
  box-shadow: 0 0 10px #cfcfcf;
  z-index: 3;
}

.main
  .content-box
  .message-manipulation-area
  .message-manipulation-button-group {
  flex: 0 1 144px;
  display: flex;
  display: -webkit-flex;
}

.main .content-box .message-manipulation-area .message-input-field {
  flex: 1 2 auto;
  position: relative;
}

.record-menubar {
  right: 32px;
  bottom: 32px;
  flex-direction: row;
  width: 96px;
}

.record-menubar .record-menubar-item {
  width: 32px;
  height: 32px;
  position: relative;
}

.popout-window-area {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1024;
  background-color: rgba(125, 123, 22, 0.2);
}

.popout-window {
  background-color: white;
  width: 260px;
  height: 165px;
  border-radius: 10px;
  font-weight: 600;
}

.popout-window .time-input-box {
  width: 32px;
  height: 32px;
  margin: auto;
  text-align: center;
  border-width: 0;
  font-size: 16px;
  box-shadow: 0 0 4px #cfcfcf;
}

.main .content-box .message-manipulation-area .message-manipulation-button {
  position: relative;
  flex: 1 1 36px;
}

.content-box .emoji-selection-area {
  flex: 0 0 120px;
  display: flex;
  flex-wrap: wrap;
  align-content: start;
  overflow: auto;
  background-color: #f0ffdf;
}

.content-box .single-emoji-selection-area {
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  margin: 4px;
  cursor: default;
}

.bottom-area-button-area:hover,
.message-manipulation-button:hover,
.header-left-button-group div:hover,
.header-right-button-item:hover,
.single-emoji-selection-area:hover {
  background-color: lavender;
  border-radius: 4px;
}

.popout-menubar .popout-menubar-item:hover {
  color: #349dff;
}

.nav-list-item:hover {
  opacity: 0.85;
  background-color: whitesmoke;
}

.bottom-input-box {
  width: 100%;
  height: 32px;
  padding: 0 6px;
  margin: 2px 0;
  border: none;
  outline: none;
  border-radius: 6px;
  box-shadow: inset 0 0 2px 1px #cfcfcf;
  font-size: 15px;
}

.message-send-status-icon{
  height: 11px;
  position:absolute;
  left:10px;
  bottom:4px;
}

.message-send-time{
  position: absolute;
  left: 12px;
  top: 4px;
  font-size: 10px;
  text-align: left;
  width: 90px;
}

</style>
