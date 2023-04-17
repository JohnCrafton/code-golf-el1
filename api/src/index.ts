import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// if food_truck.json doesn't exist, download it from the default source
try {
    readFileSync(join(__dirname, 'food_truck.json'), 'utf-8');
} catch (e) {
    const foodTruck = readFileSync('https://data.sfgov.org/resource/rqzj-sfat.json', 'utf-8');
    writeFileSync(join(__dirname, 'food_truck.json'), foodTruck);
}

const foodTruck = JSON.parse(readFileSync(join(__dirname, 'food_truck.json'), 'utf-8'));

// filter trucks on "ISSUED" status, returning name, address, locationdescription, dayshours, and fooditems
export const handler: APIGatewayProxyHandler = async (event, _context) => {
    const { day, time } = event.queryStringParameters;
    const filteredTrucks = foodTruck.filter((truck) => {
        const { applicant, address, locationdescription, dayshours, fooditems, status } = truck;
        if (status !== 'ISSUED') {
            return false;
        }
        return { applicant, address, locationdescription, dayshours, fooditems };
    });
    return {
        statusCode: 200,
        body: JSON.stringify(filteredTrucks),
    };
}