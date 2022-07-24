<?php $Core = new GCZ_Core; ?>
<div id="app">
    <t-layout>
        <main class="gcz-pc-main">
            <div id="gcz-pc-store" class="gcz-width">
                <div class="gcz-store" style="background:#fff">
                    <t-swiper class="gcz-store-left" :duration="300" :interval="2000">
                        <?php foreach (get_post_meta(get_the_ID(),'gcz_store_swiper',true) as $swiper) { ?>
                        <t-swiper-item>
                            <img style="object-fit:cover;width:100%" src="<?php echo $swiper['gcz_store_swiper_item']; ?> "/>
                        </t-swiper-item>
                        <?php } ?>
                    </t-swiper>
                    <div class="gcz-store-right">
                        <div class="gcz-store-right-item">
                        <h1><?php the_title(); ?></h1>
                            <div class="gcz-store-price">
                                <?php
                                if (get_post_meta(get_the_ID(),'gcz_store_discount_price',true) == get_post_meta(get_the_ID(),'gcz_store_default_price',true)) {
                                } else {
                                    echo '<div class="count-price next">';
                                    echo '￥'.get_post_meta(get_the_ID(),'gcz_store_discount_price',true);
                                    echo '</div>';
                                }
                                ?>
                                <div class="price <?php if (get_post_meta(get_the_ID(),'gcz_store_discount_price',true) == get_post_meta(get_the_ID(),'gcz_store_default_price',true)) {} else { echo 'next';}?>
                                ">
                                    <?php echo '原价：￥'.get_post_meta(get_the_ID(),'gcz_store_default_price',true); ?>
                                </div>
                            </div>
                        </div>
                        <t-form>
                            <t-form-item label="数量">
                                <t-input-number @change="countChange" v-model="TDStoreCount" :min="1"></t-input-number>
                            </t-form-item>
                            <t-form-item class="gcz-store-action">
                                <a class="noicon" target="_blank" :href="TDBuyLink">
                                    <t-button size="large" style="margin-right:12px">购买</t-button>
                                </a>
                                <t-button :loading="addChartsLoading" @click="addCharts('<?php echo get_the_ID(); ?>','<?php the_title(); ?>','<?php echo get_post_meta(get_the_ID(),'gcz_store_swiper',true)[0]['gcz_store_swiper_item']; ?>')" size="large" variant="base" theme="default">加入购物车</t-button>
                            </t-form-item>
                        </t-form>
                    </div>
                </div>
                <div class="gcz-store-content" style="background:#fff">
                    <?php the_content(); ?>
                </div>
            </div>
        </main>
    </t-layout>
</div>

<script>
    let StoreSingle = new Vue({
        data: {
            TDStoreCount:1,
            addChartsLoading: false,
            TDBuyLink:'<?php echo '/'.$Core->td_get_page('Pages/Vandilate.php'); ?>?count=1&id=<?php echo get_the_ID(); ?>',
        },
        methods: {
            countChange() {
                this.TDBuyLink = '<?php echo '/'.$Core->td_get_page('Pages/Vandilate.php'); ?>?count='+this.TDStoreCount+'&id=<?php echo get_the_ID(); ?>';
            },
            addCharts(id,title,image) {
                let that = this;
                this.addChartsLoading = true;
                axios.get('/wp-admin/admin-ajax.php',{
                    params: {
                        action: 'td_add_charts',
                        post_id: id,
                        post_title: title,
                        image: image,
                        count: that.TDStoreCount
                    }
                })
                .then(function(response) {
                    console.log(response);
                    setTimeout(() => {
        	           that.addChartsLoading = false;
        	        },1000);
                    that.$notify.success({ title: response.data.message, content: '<a href="点击前往购物车"></a>'});
                })
            }
        }
    }).$mount('#app')
</script>

<style>
    .gcz-store {
        display: flex;
    }
    .gcz-store-right {
        margin-left: 12px;
        margin-right: 12px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .gcz-store .t-swiper {
        width:40%;
    }
    .gcz-store .t-swiper img {
        transition: ease 0.2s;
    }
    .gcz-store .t-swiper:hover img {
        filter: brightness(0.8);
        transition: ease 0.2s;
    }
    .gcz-store-price {
        background: #f3f3f3;
        padding: 10px;
    }
    .price.next {
        text-decoration: line-through;
    }
    .count-price.next {
        font-size: 24px;
        color: red;
    }
    .gcz-store .t-form {
        margin-top: 10px;
    }
    .gcz-store-content,.gcz-store {
        padding: 10px;
        margin-top: 12px;
        margin-bottom: 12px;
    }
    .t-form .t-form__label {
        width: auto!important;
        padding-left: 24px!important;
    }
    .t-form .t-form__controls {
        margin-left: auto!important;
    }
</style>