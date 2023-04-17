import { readFileSync } from 'fs';
import { join } from 'path';

describe('food_truck.json', () => {
    it('should be adjacent to index.ts', () => {
        const index = readFileSync(join(__dirname, 'index.ts'), 'utf-8');
        const foodTruck = readFileSync(join(__dirname, 'food_truck.json'), 'utf-8');
        expect(index).toContain(foodTruck);
    });

    it('should download from the default source if not present', () => {
        const foodTruck = readFileSync(join(__dirname, 'food_truck.json'), 'utf-8');
        expect(foodTruck).toContain('https://data.sfgov.org/resource/rqzj-sfat.json');
    });
});

describe('handler', () => {
    it('should filter trucks on "ISSUED" status, returning name, address, locationdescription, dayshours, and fooditems', () => {
        const { handler } = require('./index');
        // read a constant "foodtrucks" from the test_data/trucks.json file
        const foodTruck = readFileSync(join(__dirname, 'test_data', 'trucks.json'), 'utf-8');
        const event = {
            queryStringParameters: {
                day: 'Monday',
                time: '12:00',
            },
        };
        const { statusCode, body } = handler(event, null);
        expect(statusCode).toBe(200);
        expect(body).toBe(JSON.stringify(foodTruck));
    });
});