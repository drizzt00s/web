function startDb(){
        var Client =require("mysql").Client;
        client =new Client();
        client.user="root";
        client.password="5225541a";
        client.query("USE user");
        //准备数据库
}