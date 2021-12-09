const { BigQuery } = require('@google-cloud/bigquery');
const { client_email, private_key, key_file } = require('./credentials.json')
const { google } = require('googleapis')

const GOOGLE_APPLICATION_CREDENTIALS = require('./credentials.json')
const authJWT = new google.auth.JWT(client_email, key_file, private_key, GOOGLE_APPLICATION_CREDENTIALS)
const googleSheets = google.sheets({
    version: 'v4',
    auth: new google.auth.JWT(client_email, key_file, private_key, GOOGLE_APPLICATION_CREDENTIALS)
})

const  credentials = GoogleCredential.FromFile(GOOGLE_APPLICATION_CREDENTIALS);
const client = BigQueryClient.Create(projectId, credentials);

const projectId = "goquo-devops";
const datasetId = "goquo-devops:test";
const tableId = "goquo-devops:test.abc";

const bigquery = new BigQuery({
    projectId: projectId
});

const table = bigquery.dataset(datasetId).table(tableId);

const rows = [
    {
        playerId: '48374',
        object: 'gemss',
        value: '764',
        gameTime: '0',
        date: '2019-0-3',
        other: 'other',
        bubu: 'banane'
    }
]

bigquery
        .dataset(datasetId)
        .table(tableId)
        .insert(rows)
        .then((foundErrors) => {
            rows.forEach((row) => console.log('Inserted: ', row));

            if (foundErrors && foundErrors.insertErrors != undefined) {
                foundErrors.forEach((err) => {
                    console.log('Error: ', err);
                })
            }
        })

// exports.main = (event, context) => {
//     bigquery
//         .dataset(datasetId)
//         .table(tableId)
//         .insert(rows)
//         .then((foundErrors) => {
//             rows.forEach((row) => console.log('Inserted: ', row));

//             if (foundErrors && foundErrors.insertErrors != undefined) {
//                 foundErrors.forEach((err) => {
//                     console.log('Error: ', err);
//                 })
//             }
//         })
//         .catch((err) => {
//             //We go through the list of insertions errors
//             err.errors.forEach((error) => {
//                 //We get the list of errors on each insert
//                 const insertErrors = error.errors
//                 //We get the row in error
//                 const rowInError = error.row
//                 //We search in the list of errors for an error linked to a missing field in the database
//                 insertErrors.forEach((insertErr) => {
//                     if (insertErr.message == 'no such field.') {
//                         console.log("insert error, we need to update the database")
//                         //We get the BQ schema
//                         getTableMetadata().then((metadata) => {
//                             //We get the misisng fields
//                             const missingfield = getMissingFields(
//                                 Object.keys(rowInError),
//                                 metadata.schema.fields
//                             )

//                             //Add the misssing fields to the new schema
//                             metadata.schema.fields.push({
//                                 name: missingfield,
//                                 type: "STRING"
//                             })
//                             //const schema = 'playerId:STRING, object:STRING, value:STRING, gameTime:STRING, date:STRING, other:STRING, bubu:STRING'

//                             const destinationTableRef = table.metadata.tableReference;
//                             //Set insert job options
//                             const options = {
//                                 schema: metadata.schema,
//                                 schemaUpdateOptions: ['ALLOW_FIELD_ADDITION'],
//                                 writeDisposition: 'WRITE_APPEND',
//                                 destinationTable: destinationTableRef,
//                             };
//                             console.log(options)
//                             //Insert data with the new schema
//                             bigquery
//                                 .dataset(datasetId)
//                                 .table(tableId)
//                                 .load(rows, options)
//                                 .catch((err) => {
//                                     // HERE I GOT THE SAME NO SUCH FIELD ERROR
//                                     console.log(err.errors)
//                                 })
//                         })
//                     } else {
//                         console.error("Unhandled insert error:", insertErr)
//                     }
//                 })
//             });
//         });
// };

// const getMissingFields = (a1, a2) => {
//     const missingFields = []

//     a1.forEach((field) => {
//         let isInArray = false
//         a2.map((elmt) => {
//             if (elmt.name === field)
//                 isInArray = true
//         })
//         if (!isInArray) {
//             console.log("missing filed:", field)
//             missingFields.push(field)
//         }
//     })
//     return missingFields[0]
// }

// const getTableMetadata = async () => {
//     const [metadata] = await table.getMetadata();
//     return metadata
// }

// this.main()