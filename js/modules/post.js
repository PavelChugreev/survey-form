export default function post() {
    let data = {};

    function createData() {
        let items = document.querySelectorAll(".form-item");

        items.forEach((item, i) => {
            let inpsFrom = item.querySelectorAll("input[name='from']");
            let inpsTo = item.querySelectorAll("input[name='to']");
            let selectsType = item.querySelectorAll("#type");
            let selectsStatus = item.querySelectorAll("#status");

            data[`formItem-${i + 1}`] = {};

            function setValue(arr, key, id) {
                arr.forEach((item, i) => data[`${id}`][`${key}-${i + 1}`] = item.value);
            }
            setValue(inpsFrom, "from", `formItem-${i + 1}`);
            setValue(inpsTo, 'to', `formItem-${i + 1}`);
            setValue(selectsType, "type", `formItem-${i + 1}`);
            setValue(selectsStatus, 'status', `formItem-${i + 1}`);
        });
    }

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: data
        });
        return await res.json();
    };

    const nextBtn = document.querySelector(".next-btn button");
    const testBtn = document.querySelector(".test-btn button");
    nextBtn.addEventListener("click", () => createData());

    testBtn.addEventListener("click", (e) => {
        e.preventDefault();

        createData();
        const json = JSON.stringify(data);

        postData("http://localhost:3000/requests", json)
            .then(data => {
                console.log(data);
            }).catch(() => {
                console.log("error");
            }).finally(() => {
                console.log("reset");
            });
    });
}