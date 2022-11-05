class Rent_room {
    constructor(
      id,
      room_number,
      floor,
      build,
      room_price,
      room_type,
      common_fee,
      room_status,
      color,
      tenant_id
    ) {
      this.id = id;
      this.room_number = room_number;
      this.floor = floor;
      this.build = build;
      this.room_price = room_price;
      this.room_type = room_type;
      this.common_fee = common_fee;
      this.room_status = room_status;
      this.color = color;
      this.tenant_id = tenant_id;
    }
  }

export default Rent_room