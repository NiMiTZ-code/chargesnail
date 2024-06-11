export class Charger{
    constructor(id,display_name, street, city, postal_code, gps_lat, gps_long, isActive, description, res_start_date, res_end_date){
        this.id = id;
        this.display_name = display_name;
        this.street = street;
        this.city = city;
        this.postal_code = postal_code;
        this.gps_lat = gps_lat;
        this.gps_long = gps_long;
        this.isActive = isActive;
        this.description = description;
        this.res_start_date = res_start_date;
        this.res_end_date = res_end_date;
    }
}