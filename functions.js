var stripe = Stripe('pk_test_NqgKhyrvqSdQKVOHcEGIKb35003DUXhR44');
var elements = stripe.elements();

var style = {
    base: {
        // Add your base input styles here. For example:
        fontSize: '16px',
        color: "#32325d",
    }
};

// Create an instance of the card Element.
var card = elements.create('card', {style: style});

// Add an instance of the card Element into the `card-element` <div>.
card.mount('#card-element');


function displayPaymentMethod(e) {
    console.log(e.target.dataset.type);
    let elm = document.querySelector(`div[data-select="${e.target.dataset.type}"]`);
    console.log(elm);
    document.querySelector(".paymentType.visible").classList.remove("visible");
    elm.classList.add("visible")
}

function submitForm() {
    console.log("Form Submt");

    let register = {
      lastName: document.querySelector("#lastName").value,
      firstName: document.querySelector("#firstName").value,
      streetAddress: document.querySelector("#streetAddress").value,
        city: document.querySelector("#city").value,
        state: document.querySelector("#state").value,
        zip: document.querySelector("#zip").value,
        workAddress: document.querySelector("#workAddress").value,
        cellPhone: document.querySelector("#cellPhone").value,
        homePhone: document.querySelector("#homePhone").value,
        workPhone: document.querySelector("#workPhone").value,
        jobTitle: document.querySelector("#jobTitle").value,
        numberOfTickets: document.querySelector("#numbTickets").value,
        ticketType: document.querySelector("#ticketType").value,
        paymentType: document.querySelector(".paymentOption input:checked").value,
        paymentNumber: document.querySelector("#paymentNumber").value,
        paymentDate: Date.now()
    };

    console.log(register);




    return false;
}