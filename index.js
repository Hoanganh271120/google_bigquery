const {BigQuery} = require('@google-cloud/bigquery')
const GOOGLE_APPLICATION_CREDENTIALS = require('./connector')

line = {"id":"123", "dttme":"201807012130", "brwsr":"Chrome", "pg_id":"hpv1"};
const datajson=line
const TableObjectHeader = {
    "tableReference": {
      "projectId": "goquo-devops",
      "datasetId": "goquo-devops:test",
      "tableId": "goquo-devops:test.abc",
    }
  }

const bigqueryClient = new BigQuery()
const dataset = bigqueryClient.dataset(TableObjectHeader['tableReference']['datasetId']);
const table = dataset.table(TableObjectHeader['tableReference']['tableId']);
table.insert(datajson, function(err, response) {
      console.log("error:"+JSON.stringify(err));
      console.log("response:"+JSON.stringify(response));
})


