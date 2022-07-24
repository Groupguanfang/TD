# 添加商品到购物车
这个API允许你将商品添加到`当前已登录用户`的购物车中，或者查询`当前已登录用户`的购物车数据。  
为了安全，请勿二开出可以操作任意用户的购物车的API，要不然出了事没人能承担责任。
> 注意：此请求会生成当前时间的md5加密hash值，因此并发请求请别太快，必须一秒一个请求，要不然会生成多个hash值一样的商品值。此时`购物车删除商品`的API执行时，就会把全部hash值一样的项目都删了。  
因此一句话：请别请求地太快，谢谢 (￣▽￣)*  
此后有空换个加密方式，加点盐进去怕是就不会了。

<!-- tabs:start -->
#### **请求**
> 地址： /wp-admin/admin-ajax.php

|参数|必填|说明|
|---|---|---|
|`action`|是|WordPress AJAX请求必备，值必须为`td_add_charts`|
|`post_id`|否|商品id，必填|
|`post_title`|否|商品标题，默认不会获取标题，必须自行自定义标题|
|`image`|否|商品图片，默认不会获取图片，必须自行自定义图片|
|`count`|否|商品数量|

#### **示例返回值**

### 如果您未登录
```
{
    "code": 500,
    "message": "您未登录"
}
```
### 如果您已登录

#### 如果参数不齐
此时则作为查询数据使用。
```
{
    "message": "参数不齐",
    "data": [
        {
            "charts": "985a892671ba456275f94e7407eda8df",
            "count": "1",
            "id": "52",
            "title": "商品测试一",
            "image": "https://td.xhhzs.cn/wp-content/uploads/2022/06/1656478118-4f7742920a3641d3.jpg",
            "price": 8.99
        }
    ]
}
```
#### 如果参数齐了
此时购物车添加成功，并且返回添加后的数据。
```
{
    "message": "添加成功",
    "data": [
        {
            "charts": "985a892671ba456275f94e7407eda8df",
            "count": "1",
            "id": "52",
            "title": "商品测试一",
            "image": "https://td.xhhzs.cn/wp-content/uploads/2022/06/1656478118-4f7742920a3641d3.jpg",
            "price": 8.99
        },
        {
            "charts": "26706a6d8646410a0017ce8ba127a7b1",
            "count": "1",
            "id": "52",
            "title": "商品测试一",
            "image": "https://td.xhhzs.cn/wp-content/uploads/2022/06/1656478118-4f7742920a3641d3.jpg",
            "price": 8.99
        },
    ]
}
```

<!-- tabs:end -->

## 所在目录
> /Inc/GAddCharts.php