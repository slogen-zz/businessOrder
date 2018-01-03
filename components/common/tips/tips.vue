<template>
    <div class="tips">
        <div class="tips-title">拼团须知</div>
        <div class="tips-con"><i></i> 邀请好友参团 <i></i> 达到人数即享拼团价 <i></i> 未达人数可享受一人成团价</div>

    </div>
</template>

<script type="text/ecmascript-6">
export default{
}
</script>

<style>
    .tips {
        margin-bottom: 10px;
        background: #fff;
        overflow: hidden;
        padding: 0 10px 11px;
    }

    .tips-title {
        height: 43px;
        line-height: 43px;
        border-bottom: 1px solid #eee;
        font-size: 15px;
        color: #666;
    }

    .tips-con {
        margin-top: 11px;
        font-size: 13px;
        color: #222;
        line-height: 22px;
    }
    .tips-con i{
        display: inline-block;
        width: 3px;
        height:10px;
        background: url("./img/og.png") no-repeat center;
        background-size: 100%;
    }
</style>
