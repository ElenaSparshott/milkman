function makeOrderReadable(jo) {
    return `<p><b>${jo.product}</b> ${jo.quantity}</p>`
}

function displayOrder() {
    
    let name = document.getElementById("customer_name").value
    document.getElementById("order_heading").innerText = `${name}'s order`
    fetch(`/order/${name}`)
    .then(response => response.json())
    .then(j => {
        str = j.map(makeOrderReadable).join("")
        document.getElementById("order").innerHTML=str
    });
}
