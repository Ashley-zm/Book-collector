<template>
    <div style="padding-top:15px">
        <a-row>
            <a-col :offset='6'>
                <iframe frameborder="0" src="https://book.jftio.cn/pc/login-qr.html"
                    style="width: 308px;height: 408px"></iframe>
            </a-col>
        </a-row>
    </div>
</template>
<script>
    // 用户扫描后回调监听
    window.addEventListener("message", (event) => {
        import store from '@/store'
        import router from '@/router'
        window.addEventListener("message", (event) => {
            //只有这个才是登陆成功发的消息
            if (event.origin === "https://book.jftio.cn") {
                //全部的请求参数包含,目前只需要code
                console.log(event.data);
                //登陆成功code
                console.log(event.data['code']);
                store.dispatch("WechatLogin", { code: event.data['code'], platform: 'web_app' }).then(res => {
                    router.push('/');
                });
            }
        });
        export default {
            mounted() {
                // 用户扫描后回调监听

            }
        }
    })
</script>