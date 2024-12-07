var connection = new signalR.HubConnectionBuilder().withUrl(apiUrl + "updatesHub").withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information).build();






connection.on("UpdateRate", function (item) {
    var res = item;

    setValueByClass("fromAmountInput", res.amount);
    setInnerByClass("fromAmount", res.amount);
});

function initConnection(orderId){
    connection.start().then(function () {
        connection.invoke("UpdateOrderConnectionId", orderId);
    }).catch(function (err) {
        return console.error(err.toString());
    });
}