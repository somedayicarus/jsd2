var reservations = {
    reservationId: 12345,
    client_id: "C980",
    confirmation_number: "12345",
    first_name: "John",
    last_name: "Jones",
    rewards_member: true,
    checkin_date: "20160909",
    checkout_date: "20160910",
    room_type: "Single",
    credit_card: {
        type: "Visa",
        expiration: "08/18",
        last_4_digits: "5234"
    },
    updateArrivalDate: function(d) {
        this.client_info.checkin_date(d);
    }
}