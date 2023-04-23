console.log("Loading function");

const defaultPID = {
  idcard_no: "1109900429570",
  first_name: "กรรเชียง",
  last_name: "กรองทอง",
  birthdate: "25311020",
  laser_no: "ME4152245546",
};

const successResponse = {
  status: "success",
  message: null,
  debug: null,
  metadata: null,
  result: {
    Body: {
      CheckCardByLaserResponse: {
        CheckCardByLaserResult: {
          IsError: "false",
          ErrorMessage: {},
          Code: "0",
          Desc: "สถานะปกติ",
        },
      },
    },
  },
};

const failLaserResponse = {
  status: "error",
  message: "The laser no must be 12 characters.",
  debug: {
    laser_no: ["The laser no must be 12 characters."],
  },
  metadata: null,
  result: null,
  msg_code: null,
};

//name, birth
const failDataResponse = {
  status: "success",
  message: null,
  debug: null,
  metadata: null,
  result: {
    Body: {
      CheckCardByLaserResponse: {
        CheckCardByLaserResult: {
          IsError: "true",
          ErrorMessage: {},
          Code: "4",
          Desc: "สถานะไม่ปกติ => ข้อมูลไม่ตรง",
        },
      },
    },
  },
};

const failIDResponse = {
  status: "error",
  message: "The idcard_no must be 13 characters.",
  debug: {
    pid: ["The idcard_no must be 13 characters."],
  },
  metadata: null,
  result: null,
  msg_code: null,
};

const failIDdataResponse = {
  status: "success",
  message: null,
  debug: null,
  metadata: null,
  result: {
    Body: {
      CheckCardByLaserResponse: {
        CheckCardByLaserResult: {
          IsError: "true",
          ErrorMessage: {},
          Code: "4",
          Desc: "สถานะไม่ปกติ => ไม่พบเลขรหัสกำกับบัตร จากเลขประจำตัวประชาชนนี้",
        },
      },
    },
  },
};

const functionResponse = {
  statusCode: 200,
  headers: {
    "Content-Type": "application/json",
  },
};

exports.handler = async (event, context) => {
  const apiKey = event.headers["x-aigen-key"];

  if (apiKey !== "H799THhPpUBg") {
    return {
      statusCode: 401,
      body: "Unauthorized",
    };
  }

  // lambda
  // const body = JSON.parse(event["body"]);

  //express
  const body = event["body"];

  if (shallowEqual(body, defaultPID)) {
    return { ...functionResponse, body: JSON.stringify(successResponse) };
  }

  if (body.laser_no.length !== 12) {
    return { ...functionResponse, body: JSON.stringify(failLaserResponse) };
  }

  if (body.idcard_no.length !== 13) {
    return { ...functionResponse, body: JSON.stringify(failIDResponse) };
  }

  if (body.idcard_no !== defaultPID.idcard_no) {
    return { ...functionResponse, body: JSON.stringify(failIDdataResponse) };
  }

  if (!shallowEqual(body, defaultPID)) {
    return { ...functionResponse, body: JSON.stringify(failDataResponse) };
  }

  return {
    statusCode: 400,
  };
};

function shallowEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }
  return true;
}
