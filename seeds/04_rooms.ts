import * as Knex from 'knex';

const tableName = 'room';

exports.seed = async (knex: Knex) => {
  // Deletes ALL existing entries
  await knex(tableName).del();
  // Inserts seed entries
  return knex(tableName).insert([

    // Prologue //

    // Chapter 1 //
    // 1A //


    // 1B //
    { id: 1001, 		room_no: 1, 		checkpoint_id: 103, 		debug_id: '00', 	  nickname: '' },
    { id: 1002, 		room_no: 2, 		checkpoint_id: 103, 		debug_id: '01', 		nickname: '' },
    { id: 1003, 		room_no: 3, 		checkpoint_id: 103, 		debug_id: '02', 	  nickname: '' },
    { id: 1004, 		room_no: 4, 		checkpoint_id: 103, 		debug_id: '02b', 	  nickname: '' },
    { id: 1005, 		room_no: 5, 		checkpoint_id: 103, 		debug_id: '03', 		nickname: '' },

    { id: 1006, 		room_no: 1, 		checkpoint_id: 104, 		debug_id: '04', 		nickname: '' },
    { id: 1007, 		room_no: 2, 		checkpoint_id: 104, 		debug_id: '05', 		nickname: '' },
    { id: 1008, 		room_no: 3, 		checkpoint_id: 104, 		debug_id: '05b', 		nickname: '' },
    { id: 1009, 		room_no: 4, 		checkpoint_id: 104, 		debug_id: '06', 		nickname: '' },
    { id: 1010, 		room_no: 5, 		checkpoint_id: 104,     debug_id: '07', 		nickname: '' },

    { id: 1011, 		room_no: 1, 		checkpoint_id: 105, 		debug_id: '08', 		nickname: '' },
    { id: 1012, 		room_no: 2, 		checkpoint_id: 105, 		debug_id: '08b', 		nickname: '' },
    { id: 1013, 		room_no: 3, 		checkpoint_id: 105, 		debug_id: '09', 		nickname: '' },
    { id: 1014, 		room_no: 4, 		checkpoint_id: 105, 		debug_id: '10', 		nickname: '' },
    { id: 1015, 		room_no: 5, 		checkpoint_id: 105, 		debug_id: '11', 		nickname: '' },
    { id: 1016, 		room_no: 6, 		checkpoint_id: 105, 		debug_id: 'end', 		nickname: '' },


    // 1C //


    // Chapter 2 //
    // 2A //
    { id: 2001, 		room_no: 1, 		checkpoint_id: 200, 		debug_id: 'start', 	nickname: '' },
    { id: 2002, 		room_no: 2, 		checkpoint_id: 200, 		debug_id: 's0', 		nickname: '' },
    { id: 2003, 		room_no: 3, 		checkpoint_id: 200, 		debug_id: 's1', 	  nickname: '' },
    { id: 2004, 		room_no: 4, 		checkpoint_id: 200, 		debug_id: 's2', 	  nickname: '' },
    { id: 2005, 		room_no: 5, 		checkpoint_id: 200, 		debug_id: '0', 		  nickname: '' },
    { id: 2006, 		room_no: 6, 		checkpoint_id: 200, 		debug_id: '1', 		  nickname: '' },
    { id: 2007, 		room_no: 7, 		checkpoint_id: 200, 		debug_id: '2', 		  nickname: '' },
    { id: 2008, 		room_no: 8, 		checkpoint_id: 200, 		debug_id: 'd0', 		nickname: '' },
    { id: 2009, 		room_no: 9, 		checkpoint_id: 200, 		debug_id: 'd7', 		nickname: '' },
    { id: 2010, 		room_no: 10, 		checkpoint_id: 200,     debug_id: 'd8', 		nickname: '' },
    { id: 2011, 		room_no: 11, 		checkpoint_id: 200, 		debug_id: 'd3', 		nickname: '' },
    { id: 2012, 		room_no: 12, 		checkpoint_id: 200, 		debug_id: 'd2', 		nickname: '' },
    { id: 2013, 		room_no: 13, 		checkpoint_id: 200, 		debug_id: 'd9', 		nickname: '' },
    { id: 2014, 		room_no: 14, 		checkpoint_id: 200, 		debug_id: 'd6', 		nickname: '' },
    { id: 2015, 		room_no: 15, 		checkpoint_id: 200, 		debug_id: 'd1', 		nickname: '' },
    { id: 2016, 		room_no: 16, 		checkpoint_id: 200, 		debug_id: 'd4', 		nickname: '' },
    { id: 2017, 		room_no: 17, 		checkpoint_id: 200, 		debug_id: 'd5', 		nickname: '' },
    { id: 2018, 		room_no: 18, 		checkpoint_id: 200, 		debug_id: '3x', 		nickname: '' },

    { id: 2019, 		room_no: 1, 		checkpoint_id: 201, 		debug_id: '3', 		  nickname: '' },
    { id: 2020, 		room_no: 2, 		checkpoint_id: 201, 		debug_id: '4', 		  nickname: '' },
    { id: 2021, 		room_no: 3, 		checkpoint_id: 201, 		debug_id: '5', 		  nickname: '' },
    { id: 2022, 		room_no: 4, 		checkpoint_id: 201, 		debug_id: '6', 		  nickname: '' },
    { id: 2023, 		room_no: 5, 		checkpoint_id: 201, 		debug_id: '7', 	    nickname: '' },
    { id: 2024, 		room_no: 6, 		checkpoint_id: 201, 		debug_id: '8', 		  nickname: '' },
    { id: 2025, 		room_no: 7, 		checkpoint_id: 201, 		debug_id: '9', 		  nickname: '' },
    { id: 2026, 		room_no: 8, 		checkpoint_id: 201, 		debug_id: '9b', 		nickname: '' },
    { id: 2027, 		room_no: 9, 		checkpoint_id: 201, 		debug_id: '10', 		nickname: '' },
    { id: 2028, 		room_no: 10, 		checkpoint_id: 201, 		debug_id: '11', 		nickname: '' },
    { id: 2029, 		room_no: 11, 		checkpoint_id: 201, 		debug_id: '12b', 		nickname: '' },
    { id: 2030, 		room_no: 12, 		checkpoint_id: 201, 		debug_id: '12c', 		nickname: '' },
    { id: 2031, 		room_no: 13, 		checkpoint_id: 201, 		debug_id: '12d', 		nickname: '' },
    { id: 2032, 		room_no: 14, 		checkpoint_id: 201, 		debug_id: '12', 		nickname: '' },
    { id: 2033, 		room_no: 15, 		checkpoint_id: 201, 		debug_id: '13', 		nickname: '' },

    { id: 2034, 		room_no: 1, 		checkpoint_id: 202, 	  debug_id: 'end_0', 	  nickname: '' },
    { id: 2035, 		room_no: 2, 		checkpoint_id: 202, 		debug_id: 'end_s0', 	nickname: '' },
    { id: 2036, 		room_no: 3, 		checkpoint_id: 202, 		debug_id: 'end_s1', 	nickname: '' },
    { id: 2037, 		room_no: 4, 		checkpoint_id: 202, 		debug_id: 'end_1', 		nickname: '' },
    { id: 2038, 		room_no: 5, 		checkpoint_id: 202, 		debug_id: 'end_2', 		nickname: '' },
    { id: 2039, 		room_no: 6, 		checkpoint_id: 202, 		debug_id: 'end_3', 		nickname: '' },
    { id: 2040, 		room_no: 7, 		checkpoint_id: 202, 		debug_id: 'end_4', 		nickname: '' },
    { id: 2041, 		room_no: 8, 		checkpoint_id: 202, 		debug_id: 'end_3b', 	nickname: '' },
    { id: 2042, 		room_no: 9, 		checkpoint_id: 202, 		debug_id: 'end_3cb', 	nickname: '' },
    { id: 2043, 		room_no: 10, 		checkpoint_id: 202, 		debug_id: 'end_3c', 	nickname: '' },
    { id: 2044, 		room_no: 11, 		checkpoint_id: 202, 		debug_id: 'end_5', 		nickname: '' },
    { id: 2045, 		room_no: 12, 		checkpoint_id: 202, 		debug_id: 'end_6', 		nickname: '' },


    // 2B //
    { id: 2001, 		room_no: 1, 		checkpoint_id: 203, 		debug_id: 'start', 	nickname: '' },
    { id: 2002, 		room_no: 2, 		checkpoint_id: 203, 		debug_id: '00', 		nickname: '' },
    { id: 2003, 		room_no: 3, 		checkpoint_id: 203, 		debug_id: '01', 	  nickname: '' },
    { id: 2004, 		room_no: 4, 		checkpoint_id: 203, 		debug_id: '01b', 	  nickname: '' },
    { id: 2005, 		room_no: 5, 		checkpoint_id: 203, 		debug_id: '02b', 		nickname: '' },
    { id: 2006, 		room_no: 6, 		checkpoint_id: 203, 		debug_id: '02', 		nickname: '' },

    { id: 2007, 		room_no: 1, 		checkpoint_id: 204, 		debug_id: '03', 		nickname: '' },
    { id: 2008, 		room_no: 2, 		checkpoint_id: 204, 		debug_id: '04', 		nickname: '' },
    { id: 2009, 		room_no: 3, 		checkpoint_id: 204, 		debug_id: '05', 		nickname: '' },
    { id: 2010, 		room_no: 4, 		checkpoint_id: 204,     debug_id: '06', 		nickname: '' },
    { id: 2011, 		room_no: 5, 		checkpoint_id: 204, 		debug_id: '07', 		nickname: '' },

    { id: 2012, 		room_no: 1, 		checkpoint_id: 205, 		debug_id: '08b', 		nickname: '' },
    { id: 2013, 		room_no: 2, 		checkpoint_id: 205, 		debug_id: '08', 		nickname: '' },
    { id: 2014, 		room_no: 3, 		checkpoint_id: 205, 		debug_id: '09', 		nickname: '' },
    { id: 2015, 		room_no: 4, 		checkpoint_id: 205, 		debug_id: '10', 		nickname: '' },
    { id: 2016, 		room_no: 5, 		checkpoint_id: 205, 		debug_id: '11', 		nickname: '' },
    { id: 2017, 		room_no: 6, 		checkpoint_id: 205, 		debug_id: 'end', 		nickname: '' },
    

    // 2C  //



    // Chapter 3 //
    // 3A //
    { id: 3001, 		room_no: 1, 		checkpoint_id: 300, 		debug_id: 's0', 		  nickname: '' },
    { id: 3002, 		room_no: 2, 		checkpoint_id: 300, 		debug_id: 's1', 		  nickname: '' },
    { id: 3003, 		room_no: 3, 		checkpoint_id: 300, 		debug_id: 's2', 		  nickname: '' },
    { id: 3004, 		room_no: 4, 		checkpoint_id: 300, 		debug_id: 's3', 		  nickname: '' },
    { id: 3005, 		room_no: 5, 		checkpoint_id: 300, 		debug_id: '0x-a', 		nickname: '' },
    { id: 3006, 		room_no: 6, 		checkpoint_id: 300, 		debug_id: '00-a', 		nickname: '' },
    { id: 3007, 		room_no: 7, 		checkpoint_id: 300, 		debug_id: '02-a', 		nickname: '' },
    { id: 3008, 		room_no: 8, 		checkpoint_id: 300, 		debug_id: '02-b', 		nickname: '' },
    { id: 3009, 		room_no: 9, 		checkpoint_id: 300, 		debug_id: '01-b', 		nickname: '' },
    { id: 3010, 		room_no: 10, 		checkpoint_id: 300,     debug_id: '00-b', 		nickname: '' },
    { id: 3011, 		room_no: 11, 		checkpoint_id: 300, 		debug_id: '00-c', 		nickname: '' },
    { id: 3012, 		room_no: 12, 		checkpoint_id: 300, 		debug_id: '0x-b', 		nickname: '' },
    { id: 3013, 		room_no: 13, 		checkpoint_id: 300, 		debug_id: '03-a', 		nickname: '' },
    { id: 3014, 		room_no: 14, 		checkpoint_id: 300, 		debug_id: '04-b', 		nickname: '' },
    { id: 3015, 		room_no: 15, 		checkpoint_id: 300, 		debug_id: '05-a', 		nickname: '' },
    { id: 3016, 		room_no: 16, 		checkpoint_id: 300, 		debug_id: '06-a', 		nickname: '' },
    { id: 3017, 		room_no: 17, 		checkpoint_id: 300, 		debug_id: '07-a', 		nickname: '' },
    { id: 3018, 		room_no: 18, 		checkpoint_id: 300, 		debug_id: '07-b', 		nickname: '' },
    { id: 3019, 		room_no: 19, 		checkpoint_id: 300, 		debug_id: '06-b', 		nickname: '' },
    { id: 3020, 		room_no: 20, 		checkpoint_id: 300, 		debug_id: '06-c', 		nickname: '' },
    { id: 3021, 		room_no: 21, 		checkpoint_id: 300, 		debug_id: '05-c', 		nickname: '' },
    { id: 3022, 		room_no: 22, 		checkpoint_id: 300, 		debug_id: '08-c', 		nickname: '' },
    { id: 3023, 		room_no: 23, 		checkpoint_id: 300, 		debug_id: '08-b', 	  nickname: '' },

    { id: 3024, 		room_no: 1, 		checkpoint_id: 301, 		debug_id: '08-a', 		nickname: '' },
    { id: 3025, 		room_no: 2, 		checkpoint_id: 301, 		debug_id: '08-x', 		nickname: '' },
    { id: 3026, 		room_no: 3, 		checkpoint_id: 301, 		debug_id: '09-b', 		nickname: '' },
    { id: 3027, 		room_no: 4, 		checkpoint_id: 301, 		debug_id: '11-x', 		nickname: '' },
    { id: 3028, 		room_no: 5, 		checkpoint_id: 301, 		debug_id: '11-y', 		nickname: '' },
    { id: 3029, 		room_no: 6, 		checkpoint_id: 301, 		debug_id: '12-y', 		nickname: '' },
    { id: 3030, 		room_no: 7, 		checkpoint_id: 301, 		debug_id: '11-z', 		nickname: '' },
    { id: 3031, 		room_no: 8, 		checkpoint_id: 301, 		debug_id: '10-z', 		nickname: '' },
    { id: 3032, 		room_no: 9, 		checkpoint_id: 301, 		debug_id: '10-y', 		nickname: '' },
    { id: 3033, 		room_no: 10, 		checkpoint_id: 301, 		debug_id: '10-x', 		nickname: '' },
    { id: 3034, 		room_no: 11, 		checkpoint_id: 301, 	  debug_id: '10-c', 	  nickname: '' },
    { id: 3035, 		room_no: 12, 		checkpoint_id: 301, 		debug_id: '11-c', 		nickname: '' },
    { id: 3036, 		room_no: 13, 		checkpoint_id: 301, 		debug_id: '12-c', 		nickname: '' },
    { id: 3037, 		room_no: 14, 		checkpoint_id: 301, 		debug_id: '12-d', 		nickname: '' },
    { id: 3038, 		room_no: 15, 		checkpoint_id: 301, 		debug_id: '11-d', 		nickname: '' },
    { id: 3039, 		room_no: 16, 		checkpoint_id: 301, 		debug_id: '10-d', 		nickname: '' },
    { id: 3040, 		room_no: 17, 		checkpoint_id: 301, 		debug_id: '11-b', 		nickname: '' },
    { id: 3041, 		room_no: 18, 		checkpoint_id: 301, 		debug_id: '12-b', 		nickname: '' },
    { id: 3042, 		room_no: 19, 		checkpoint_id: 301, 		debug_id: '13-b', 		nickname: '' },
    { id: 3043, 		room_no: 20, 		checkpoint_id: 301, 		debug_id: '13-a', 		nickname: '' },
    { id: 3044, 		room_no: 21, 		checkpoint_id: 301, 		debug_id: '13-x', 		nickname: '' },
    { id: 3045, 		room_no: 22, 		checkpoint_id: 301, 		debug_id: '12-x', 		nickname: '' },
    { id: 3046, 		room_no: 23, 		checkpoint_id: 301, 		debug_id: '11-a', 		nickname: '' },

    { id: 3047, 		room_no: 1, 		checkpoint_id: 302, 		debug_id: '09-d', 		nickname: '' },
    { id: 3048, 		room_no: 2, 		checkpoint_id: 302, 		debug_id: '08-d', 		nickname: '' },
    { id: 5049, 		room_no: 3, 		checkpoint_id: 302, 		debug_id: '06-d', 		nickname: '' },
    { id: 5050, 		room_no: 4, 		checkpoint_id: 302, 		debug_id: '04-d', 		nickname: '' },
    { id: 5051, 		room_no: 5, 		checkpoint_id: 302, 		debug_id: '04-c', 		nickname: '' },
    { id: 5052, 		room_no: 6, 		checkpoint_id: 302, 		debug_id: '02-c', 		nickname: '' },
    { id: 5053, 		room_no: 7, 		checkpoint_id: 302, 		debug_id: '03-b', 		nickname: '' },
    { id: 5054, 		room_no: 8, 		checkpoint_id: 302, 		debug_id: '01-c', 		nickname: '' },
    { id: 5055, 		room_no: 9, 		checkpoint_id: 302, 		debug_id: '02-d', 		nickname: '' },

    { id: 5056, 		room_no: 1, 		checkpoint_id: 303, 		debug_id: '00-d', 		nickname: '' },
    { id: 5057, 		room_no: 2, 		checkpoint_id: 303, 		debug_id: 'roof00', 	nickname: '' },
    { id: 5058, 		room_no: 3, 		checkpoint_id: 303, 		debug_id: 'roof01', 	nickname: '' },
    { id: 5059, 		room_no: 4, 		checkpoint_id: 303, 		debug_id: 'roof02', 	nickname: '' },
    { id: 5060, 		room_no: 5, 		checkpoint_id: 303, 		debug_id: 'roof03', 	nickname: '' },
    { id: 5061, 		room_no: 6, 		checkpoint_id: 303, 		debug_id: 'roof04', 	nickname: '' },
    { id: 5062, 		room_no: 7, 		checkpoint_id: 303, 		debug_id: 'roof05', 	nickname: '' },
    { id: 5063, 		room_no: 8, 		checkpoint_id: 303, 		debug_id: 'roof06b', 	nickname: '' },
    { id: 5064, 		room_no: 9, 		checkpoint_id: 303, 		debug_id: 'roof06', 	nickname: '' },
    { id: 5065, 		room_no: 10, 		checkpoint_id: 303, 		debug_id: 'roof07', 	nickname: '' },


    // 3B //
    { id: 3001, 		room_no: 1, 		checkpoint_id: 304, 		debug_id: '00', 		  nickname: '' },
    { id: 3002, 		room_no: 2, 		checkpoint_id: 304, 		debug_id: '01', 		  nickname: '' },
    { id: 3003, 		room_no: 3, 		checkpoint_id: 304, 		debug_id: '02', 		  nickname: '' },
    { id: 3004, 		room_no: 4, 		checkpoint_id: 304, 		debug_id: '03', 		  nickname: '' },
    { id: 3005, 		room_no: 5, 		checkpoint_id: 304, 		debug_id: '04', 		  nickname: '' },
    { id: 3006, 		room_no: 6, 		checkpoint_id: 304, 		debug_id: '05', 		  nickname: '' },

    { id: 3007, 		room_no: 1, 		checkpoint_id: 305, 		debug_id: '06', 		nickname: '' },
    { id: 3008, 		room_no: 2, 		checkpoint_id: 305, 		debug_id: '07', 		nickname: '' },
    { id: 3009, 		room_no: 3, 		checkpoint_id: 305, 		debug_id: '08', 		nickname: '' },
    { id: 3010, 		room_no: 4, 		checkpoint_id: 305,     debug_id: '09', 		nickname: '' },
    { id: 3011, 		room_no: 5, 		checkpoint_id: 305, 		debug_id: '10', 		nickname: '' },

    { id: 3012, 		room_no: 1, 		checkpoint_id: 306, 		debug_id: '11', 		nickname: '' },
    { id: 3013, 		room_no: 2, 		checkpoint_id: 306, 		debug_id: '13', 		nickname: '' },
    { id: 3014, 		room_no: 3, 		checkpoint_id: 306, 		debug_id: '14', 		nickname: '' },
    { id: 3015, 		room_no: 4, 		checkpoint_id: 306, 		debug_id: '15', 		nickname: '' },
    { id: 3016, 		room_no: 5, 		checkpoint_id: 306, 		debug_id: '12', 		nickname: '' },

    { id: 3017, 		room_no: 1, 		checkpoint_id: 307, 		debug_id: '16', 		nickname: '' },
    { id: 3018, 		room_no: 2, 		checkpoint_id: 307, 		debug_id: '17', 		nickname: '' },
    { id: 3019, 		room_no: 3, 		checkpoint_id: 307, 		debug_id: '18', 		nickname: '' },
    { id: 3020, 		room_no: 4, 		checkpoint_id: 307, 		debug_id: '19', 		nickname: '' },
    { id: 3021, 		room_no: 5, 		checkpoint_id: 307, 		debug_id: '21', 		nickname: '' },
    { id: 3022, 		room_no: 6, 		checkpoint_id: 307, 		debug_id: '20', 		nickname: '' },
    { id: 3023, 		room_no: 7, 		checkpoint_id: 307, 		debug_id: 'end', 	  nickname: '' },


    // 3C //



    // Chapter 4 //
    // 4A //
    { id: 4001, 		room_no: 1, 		checkpoint_id: 400, 		debug_id: 'a-00', 		nickname: '' },
    { id: 4002, 		room_no: 2, 		checkpoint_id: 400, 		debug_id: 'a-01', 		nickname: '' },
    { id: 4003, 		room_no: 3, 		checkpoint_id: 400, 		debug_id: 'a-01x', 		nickname: '' },
    { id: 4004, 		room_no: 4, 		checkpoint_id: 400, 		debug_id: 'a-02', 		nickname: '' },
    { id: 4005, 		room_no: 5, 		checkpoint_id: 400, 		debug_id: 'a-03', 		nickname: '' },
    { id: 4006, 		room_no: 6, 		checkpoint_id: 400, 		debug_id: 'a-04', 		nickname: '' },
    { id: 4007, 		room_no: 7, 		checkpoint_id: 400, 		debug_id: 'a-05', 		nickname: '' },
    { id: 4008, 		room_no: 8, 		checkpoint_id: 400, 		debug_id: 'a-06', 		nickname: '' },
    { id: 4009, 		room_no: 9, 		checkpoint_id: 400, 		debug_id: 'a-07', 		nickname: '' },
    { id: 4010, 		room_no: 10, 		checkpoint_id: 400,     debug_id: 'a-08', 		nickname: '' },
    { id: 4011, 		room_no: 11, 		checkpoint_id: 400, 		debug_id: 'a-09', 		nickname: '' },
    { id: 4012, 		room_no: 12, 		checkpoint_id: 400, 		debug_id: 'a-10', 		nickname: '' },
    { id: 4013, 		room_no: 13, 		checkpoint_id: 400, 		debug_id: 'a-11', 		nickname: '' },

    { id: 4014, 		room_no: 1, 		checkpoint_id: 401, 		debug_id: 'b-00', 		nickname: '' },
    { id: 4015, 		room_no: 2, 		checkpoint_id: 401, 		debug_id: 'b-01', 		nickname: '' },
    { id: 4016, 		room_no: 3, 		checkpoint_id: 401, 		debug_id: 'b-02', 		nickname: '' },
    { id: 4017, 		room_no: 4, 		checkpoint_id: 401, 		debug_id: 'b-03', 		nickname: '' },
    { id: 4018, 		room_no: 5, 		checkpoint_id: 401, 		debug_id: 'b-04', 		nickname: '' },
    { id: 4019, 		room_no: 6, 		checkpoint_id: 401, 		debug_id: 'b-05', 		nickname: '' },
    { id: 4020, 		room_no: 7, 		checkpoint_id: 401, 		debug_id: 'b-06', 		nickname: '' },
    { id: 4021, 		room_no: 8, 		checkpoint_id: 401, 		debug_id: 'b-07', 		nickname: '' },
    { id: 4022, 		room_no: 9, 		checkpoint_id: 401, 		debug_id: 'b-sec', 		nickname: '' },
    { id: 4023, 		room_no: 10, 		checkpoint_id: 401, 		debug_id: 'b-secb', 	nickname: '' },
    { id: 4024, 		room_no: 11, 		checkpoint_id: 401, 		debug_id: 'b-08b', 		nickname: '' },
    { id: 4025, 		room_no: 12, 		checkpoint_id: 401, 		debug_id: 'b-08', 		nickname: '' },

    { id: 4026, 		room_no: 1, 		checkpoint_id: 402, 		debug_id: 'c-00', 		nickname: '' },
    { id: 4027, 		room_no: 2, 		checkpoint_id: 402, 		debug_id: 'c-01', 		nickname: '' },
    { id: 4028, 		room_no: 3, 		checkpoint_id: 402, 		debug_id: 'c-02', 		nickname: '' },
    { id: 4029, 		room_no: 4, 		checkpoint_id: 402, 		debug_id: 'c-04', 		nickname: '' },
    { id: 4030, 		room_no: 5, 		checkpoint_id: 402, 		debug_id: 'c-05', 		nickname: '' },
    { id: 4031, 		room_no: 6, 		checkpoint_id: 402, 		debug_id: 'c-06', 		nickname: '' },
    { id: 4032, 		room_no: 7, 		checkpoint_id: 402, 		debug_id: 'c-06b', 		nickname: '' },
    { id: 4033, 		room_no: 8, 		checkpoint_id: 402, 		debug_id: 'c-09', 		nickname: '' },
    { id: 4034, 		room_no: 9, 		checkpoint_id: 402, 	  debug_id: 'c-07', 	  nickname: '' },
    { id: 4035, 		room_no: 10, 		checkpoint_id: 402, 		debug_id: 'c-08', 		nickname: '' },
    { id: 4036, 		room_no: 11, 		checkpoint_id: 402, 		debug_id: 'c-10', 		nickname: '' },

    { id: 4037, 		room_no: 1, 		checkpoint_id: 403, 		debug_id: 'd-00', 		nickname: '' },
    { id: 4038, 		room_no: 2, 		checkpoint_id: 403, 		debug_id: 'd-00b', 		nickname: '' },
    { id: 4039, 		room_no: 3, 		checkpoint_id: 403, 		debug_id: 'd-01', 		nickname: '' },
    { id: 4040, 		room_no: 4, 		checkpoint_id: 403, 		debug_id: 'd-02', 		nickname: '' },
    { id: 4041, 		room_no: 5, 		checkpoint_id: 403, 		debug_id: 'd-03', 		nickname: '' },
    { id: 4042, 		room_no: 6, 		checkpoint_id: 403, 		debug_id: 'd-04', 		nickname: '' },
    { id: 4043, 		room_no: 7, 		checkpoint_id: 403, 		debug_id: 'd-05', 		nickname: '' },
    { id: 4044, 		room_no: 8, 		checkpoint_id: 403, 		debug_id: 'd-06', 		nickname: '' },
    { id: 4045, 		room_no: 9, 		checkpoint_id: 403, 		debug_id: 'd-07', 		nickname: '' },
    { id: 4046, 		room_no: 10, 		checkpoint_id: 403, 		debug_id: 'd-08', 		nickname: '' },
    { id: 4047, 		room_no: 11, 		checkpoint_id: 403, 		debug_id: 'd-09', 		nickname: '' },
    { id: 4048, 		room_no: 12, 		checkpoint_id: 403, 		debug_id: 'd-10', 		nickname: '' },
    

    // 4B //
    { id: 4001, 		room_no: 1, 		checkpoint_id: 404, 		debug_id: 'a-00', 		nickname: '' },
    { id: 4002, 		room_no: 2, 		checkpoint_id: 404, 		debug_id: 'a-01', 		nickname: '' },
    { id: 4003, 		room_no: 3, 		checkpoint_id: 404, 		debug_id: 'a-02', 		nickname: '' },
    { id: 4004, 		room_no: 4, 		checkpoint_id: 404, 		debug_id: 'a-03', 		nickname: '' },
    { id: 4005, 		room_no: 5, 		checkpoint_id: 404, 		debug_id: 'a-04', 		nickname: '' },

    { id: 4006, 		room_no: 1, 		checkpoint_id: 405, 		debug_id: 'b-00', 		nickname: '' },
    { id: 4007, 		room_no: 2, 		checkpoint_id: 405, 		debug_id: 'b-01', 		nickname: '' },
    { id: 4008, 		room_no: 3, 		checkpoint_id: 405, 		debug_id: 'b-02', 		nickname: '' },
    { id: 4009, 		room_no: 4, 		checkpoint_id: 405, 		debug_id: 'b-03', 		nickname: '' },
    { id: 4010, 		room_no: 5, 		checkpoint_id: 405,     debug_id: 'b-04', 		nickname: '' },

    { id: 4011, 		room_no: 1, 		checkpoint_id: 406, 		debug_id: 'c-00', 		nickname: '' },
    { id: 4012, 		room_no: 2, 		checkpoint_id: 406, 		debug_id: 'c-01', 		nickname: '' },
    { id: 4013, 		room_no: 3, 		checkpoint_id: 406, 		debug_id: 'c-02', 		nickname: '' },
    { id: 4014, 		room_no: 4, 		checkpoint_id: 406, 		debug_id: 'c-03', 		nickname: '' },
    { id: 4015, 		room_no: 5, 		checkpoint_id: 406, 		debug_id: 'c-04', 		nickname: '' },

    { id: 4016, 		room_no: 1, 		checkpoint_id: 407, 		debug_id: 'd-00', 		nickname: '' },
    { id: 4017, 		room_no: 2, 		checkpoint_id: 407, 		debug_id: 'd-01', 		nickname: '' },
    { id: 4018, 		room_no: 3, 		checkpoint_id: 407, 		debug_id: 'd-02', 		nickname: '' },
    { id: 4019, 		room_no: 4, 		checkpoint_id: 407, 		debug_id: 'd-03', 		nickname: '' },
    { id: 4020, 		room_no: 5, 		checkpoint_id: 407, 		debug_id: 'end', 		  nickname: '' },

    
    // 4C //



    // Chapter 5 //
    // 5A //
    { id: 5001, 		room_no: 1, 		checkpoint_id: 500, 		debug_id: 'a-00x', 		nickname: '' },
    { id: 5002, 		room_no: 2, 		checkpoint_id: 500, 		debug_id: 'a-00b', 		nickname: '' },
    { id: 5003, 		room_no: 3, 		checkpoint_id: 500, 		debug_id: 'a-00d', 		nickname: '' },
    { id: 5004, 		room_no: 4, 		checkpoint_id: 500, 		debug_id: 'a-00c', 		nickname: '' },
    { id: 5005, 		room_no: 5, 		checkpoint_id: 500, 		debug_id: 'a-00', 		nickname: '' },
    { id: 5006, 		room_no: 6, 		checkpoint_id: 500, 		debug_id: 'a-01', 		nickname: '' },
    { id: 5007, 		room_no: 7, 		checkpoint_id: 500, 		debug_id: 'a-02', 		nickname: '' },
    { id: 5008, 		room_no: 8, 		checkpoint_id: 500, 		debug_id: 'a-03', 		nickname: '' },
    { id: 5009, 		room_no: 9, 		checkpoint_id: 500, 		debug_id: 'a-04', 		nickname: '' },
    { id: 5010, 		room_no: 10, 		checkpoint_id: 500,     debug_id: 'a-05', 		nickname: '' },
    { id: 5011, 		room_no: 11, 		checkpoint_id: 500, 		debug_id: 'a-06', 		nickname: '' },
    { id: 5012, 		room_no: 12, 		checkpoint_id: 500, 		debug_id: 'a-07', 		nickname: '' },
    { id: 5013, 		room_no: 13, 		checkpoint_id: 500, 		debug_id: 'a-08', 		nickname: '' },
    { id: 5014, 		room_no: 14, 		checkpoint_id: 500, 		debug_id: 'a-09', 		nickname: '' },
    { id: 5015, 		room_no: 15, 		checkpoint_id: 500, 		debug_id: 'a-10', 		nickname: '' },
    { id: 5016, 		room_no: 16, 		checkpoint_id: 500, 		debug_id: 'a-11', 		nickname: '' },
    { id: 5017, 		room_no: 17, 		checkpoint_id: 500, 		debug_id: 'a-12', 		nickname: '' },
    { id: 5018, 		room_no: 18, 		checkpoint_id: 500, 		debug_id: 'a-13', 		nickname: '' },
    { id: 5019, 		room_no: 19, 		checkpoint_id: 500, 		debug_id: 'a-14', 		nickname: '' },
    { id: 5020, 		room_no: 20, 		checkpoint_id: 500, 		debug_id: 'a-15', 		nickname: '' },

    { id: 5021, 		room_no: 1, 		checkpoint_id: 501, 		debug_id: 'b-00', 		nickname: '' },
    { id: 5022, 		room_no: 2, 		checkpoint_id: 501, 		debug_id: 'b-18', 		nickname: '' },
    { id: 5023, 		room_no: 3, 		checkpoint_id: 501, 		debug_id: 'b-01', 		nickname: '' },
    { id: 5024, 		room_no: 4, 		checkpoint_id: 501, 		debug_id: 'b-01c', 		nickname: '' },
    { id: 5025, 		room_no: 5, 		checkpoint_id: 501, 		debug_id: 'b-20', 		nickname: '' },
    { id: 5026, 		room_no: 6, 		checkpoint_id: 501, 		debug_id: 'b-21', 		nickname: '' },
    { id: 5027, 		room_no: 7, 		checkpoint_id: 501, 		debug_id: 'b-01b', 		nickname: '' },
    { id: 5028, 		room_no: 8, 		checkpoint_id: 501, 		debug_id: 'b-02', 		nickname: '' },
    { id: 5029, 		room_no: 9, 		checkpoint_id: 501, 		debug_id: 'b-03', 		nickname: '' },
    { id: 5030, 		room_no: 10, 		checkpoint_id: 501, 		debug_id: 'b-04', 		nickname: '' },
    { id: 5031, 		room_no: 11, 		checkpoint_id: 501, 		debug_id: 'b-05', 		nickname: '' },
    { id: 5032, 		room_no: 12, 		checkpoint_id: 501, 		debug_id: 'b-06', 		nickname: '' },
    { id: 5033, 		room_no: 13, 		checkpoint_id: 501, 		debug_id: 'b-07', 		nickname: '' },
    { id: 5034, 		room_no: 14, 		checkpoint_id: 501, 	  debug_id: 'b-08', 	  nickname: '' },
    { id: 5035, 		room_no: 15, 		checkpoint_id: 501, 		debug_id: 'b-09', 		nickname: '' },
    { id: 5036, 		room_no: 16, 		checkpoint_id: 501, 		debug_id: 'b-10', 		nickname: '' },
    { id: 5037, 		room_no: 17, 		checkpoint_id: 501, 		debug_id: 'b-11', 		nickname: '' },
    { id: 5038, 		room_no: 18, 		checkpoint_id: 501, 		debug_id: 'b-12', 		nickname: '' },
    { id: 5039, 		room_no: 19, 		checkpoint_id: 501, 		debug_id: 'b-13', 		nickname: '' },
    { id: 5040, 		room_no: 20, 		checkpoint_id: 501, 		debug_id: 'b-14', 		nickname: '' },
    { id: 5041, 		room_no: 21, 		checkpoint_id: 501, 		debug_id: 'b-15', 		nickname: '' },
    { id: 5042, 		room_no: 22, 		checkpoint_id: 501, 		debug_id: 'b-16', 		nickname: '' },
    { id: 5043, 		room_no: 23, 		checkpoint_id: 501, 		debug_id: 'b-17', 		nickname: '' },
    { id: 5044, 		room_no: 24, 		checkpoint_id: 501, 		debug_id: 'b-19', 		nickname: '' },
    { id: 5045, 		room_no: 25, 		checkpoint_id: 501, 		debug_id: 'b-22', 		nickname: '' },
    { id: 5046, 		room_no: 26, 		checkpoint_id: 501, 		debug_id: 'void', 		nickname: '' },

    { id: 5047, 		room_no: 1, 		checkpoint_id: 502, 		debug_id: 'c-00', 		nickname: '' },
    { id: 5048, 		room_no: 2, 		checkpoint_id: 502, 		debug_id: 'c-01', 		nickname: '' },
    { id: 5049, 		room_no: 3, 		checkpoint_id: 502, 		debug_id: 'c-01b', 		nickname: '' },
    { id: 5050, 		room_no: 4, 		checkpoint_id: 502, 		debug_id: 'c-01c', 		nickname: '' },
    { id: 5051, 		room_no: 5, 		checkpoint_id: 502, 		debug_id: 'c-08b', 		nickname: '' },
    { id: 5052, 		room_no: 6, 		checkpoint_id: 502, 		debug_id: 'c-08', 		nickname: '' },
    { id: 5053, 		room_no: 7, 		checkpoint_id: 502, 		debug_id: 'c-10', 		nickname: '' },
    { id: 5054, 		room_no: 8, 		checkpoint_id: 502, 		debug_id: 'c-12', 		nickname: '' },
    { id: 5055, 		room_no: 9, 		checkpoint_id: 502, 		debug_id: 'c-07', 		nickname: '' },
    { id: 5056, 		room_no: 10, 		checkpoint_id: 502, 		debug_id: 'c-11', 		nickname: '' },
    { id: 5057, 		room_no: 11, 		checkpoint_id: 502, 		debug_id: 'c-09', 		nickname: '' },
    { id: 5058, 		room_no: 12, 		checkpoint_id: 502, 		debug_id: 'c-13', 		nickname: '' },

    { id: 5059, 		room_no: 1, 		checkpoint_id: 503, 		debug_id: 'd-00', 		nickname: '' },
    { id: 5060, 		room_no: 2, 		checkpoint_id: 503, 		debug_id: 'd-01', 		nickname: '' },
    { id: 5061, 		room_no: 3, 		checkpoint_id: 503, 		debug_id: 'd-02', 		nickname: '' },
    { id: 5062, 		room_no: 4, 		checkpoint_id: 503, 		debug_id: 'd-03', 		nickname: '' },
    { id: 5063, 		room_no: 5, 		checkpoint_id: 503, 		debug_id: 'd-04', 		nickname: '' },
    { id: 5064, 		room_no: 6, 		checkpoint_id: 503, 		debug_id: 'd-05', 		nickname: '' },
    { id: 5065, 		room_no: 7, 		checkpoint_id: 503, 		debug_id: 'd-06', 		nickname: '' },
    { id: 5066, 		room_no: 8, 		checkpoint_id: 503, 		debug_id: 'd-07', 		nickname: '' },
    { id: 5067, 		room_no: 9, 		checkpoint_id: 503, 		debug_id: 'd-09', 		nickname: '' },
    { id: 5068, 		room_no: 10, 		checkpoint_id: 503, 		debug_id: 'd-10', 		nickname: '' },
    { id: 5069, 		room_no: 11, 		checkpoint_id: 503, 		debug_id: 'd-13', 		nickname: '' },
    { id: 5070, 		room_no: 12, 		checkpoint_id: 503, 		debug_id: 'd-15', 		nickname: '' },
    { id: 5071, 		room_no: 13, 		checkpoint_id: 503, 		debug_id: 'd-19', 		nickname: '' },
    { id: 5072, 		room_no: 14, 		checkpoint_id: 503, 		debug_id: 'd-19b', 		nickname: '' },
    { id: 5073, 		room_no: 15, 		checkpoint_id: 503, 		debug_id: 'd-20', 		nickname: '' },

    { id: 5074, 		room_no: 1, 		checkpoint_id: 504, 		debug_id: 'e-00', 		nickname: '' },
    { id: 5075, 		room_no: 2, 		checkpoint_id: 504, 		debug_id: 'e-01', 		nickname: '' },
    { id: 5076, 		room_no: 3, 		checkpoint_id: 504, 		debug_id: 'e-02', 		nickname: '' },
    { id: 5077, 		room_no: 4, 		checkpoint_id: 504, 		debug_id: 'e-03', 		nickname: '' },
    { id: 5078, 		room_no: 5, 		checkpoint_id: 504, 		debug_id: 'e-04', 		nickname: '' },
    { id: 5079, 		room_no: 6, 		checkpoint_id: 504, 		debug_id: 'e-06', 		nickname: '' },
    { id: 5080, 		room_no: 7, 		checkpoint_id: 504, 		debug_id: 'e-05', 		nickname: '' },
    { id: 5081, 		room_no: 8, 		checkpoint_id: 504, 		debug_id: 'e-07', 		nickname: '' },
    { id: 5082, 		room_no: 9, 		checkpoint_id: 504, 		debug_id: 'e-08', 		nickname: '' },
    { id: 5083, 		room_no: 10, 		checkpoint_id: 504, 		debug_id: 'e-09', 		nickname: '' },
    { id: 5084, 		room_no: 11, 		checkpoint_id: 504, 		debug_id: 'e-10', 		nickname: '' },
    { id: 5085, 		room_no: 12, 		checkpoint_id: 504, 		debug_id: 'e-11', 		nickname: '' },


    // 5B //
    { id: 5001, 		room_no: 1, 		checkpoint_id: 505, 		debug_id: 'start', 		nickname: '' },
    { id: 5002, 		room_no: 2, 		checkpoint_id: 505, 		debug_id: 'a-00', 		nickname: '' },
    { id: 5003, 		room_no: 3, 		checkpoint_id: 505, 		debug_id: 'a-01', 		nickname: '' },
    { id: 5004, 		room_no: 4, 		checkpoint_id: 505, 		debug_id: 'a-02', 		nickname: '' },

    { id: 5005, 		room_no: 1, 		checkpoint_id: 506, 		debug_id: 'b-00', 		nickname: '' },
    { id: 5006, 		room_no: 2, 		checkpoint_id: 506, 		debug_id: 'b-01', 		nickname: '' },
    { id: 5007, 		room_no: 3, 		checkpoint_id: 506, 		debug_id: 'b-02', 		nickname: '' },
    { id: 5008, 		room_no: 4, 		checkpoint_id: 506, 		debug_id: 'b-03', 		nickname: '' },
    { id: 5009, 		room_no: 5, 		checkpoint_id: 506, 		debug_id: 'b-04', 		nickname: '' },
    { id: 5010, 		room_no: 6, 		checkpoint_id: 506,     debug_id: 'b-05', 		nickname: '' },
    { id: 5011, 		room_no: 7, 		checkpoint_id: 506, 		debug_id: 'b-06', 		nickname: '' },
    { id: 5012, 		room_no: 8, 		checkpoint_id: 506, 		debug_id: 'b-07', 		nickname: '' },
    { id: 5013, 		room_no: 9, 		checkpoint_id: 506, 		debug_id: 'b-08', 		nickname: '' },
    { id: 5014, 		room_no: 10, 		checkpoint_id: 506, 		debug_id: 'b-09', 		nickname: '' },

    { id: 5015, 		room_no: 1, 		checkpoint_id: 507, 		debug_id: 'c-00', 		nickname: '' },
    { id: 5016, 		room_no: 2, 		checkpoint_id: 507, 		debug_id: 'c-01', 		nickname: '' },
    { id: 5017, 		room_no: 3, 		checkpoint_id: 507, 		debug_id: 'c-02', 		nickname: '' },
    { id: 5018, 		room_no: 4, 		checkpoint_id: 507, 		debug_id: 'c-03', 		nickname: '' },
    { id: 5019, 		room_no: 5, 		checkpoint_id: 507, 		debug_id: 'c-04', 		nickname: '' },

    { id: 5020, 		room_no: 1, 		checkpoint_id: 508, 		debug_id: 'd-00', 		nickname: '' },
    { id: 5021, 		room_no: 2, 		checkpoint_id: 508, 		debug_id: 'd-01', 		nickname: '' },
    { id: 5022, 		room_no: 3, 		checkpoint_id: 508, 		debug_id: 'd-02', 		nickname: '' },
    { id: 5023, 		room_no: 4, 		checkpoint_id: 508, 		debug_id: 'd-03', 		nickname: '' },
    { id: 5024, 		room_no: 5, 		checkpoint_id: 508, 		debug_id: 'd-04', 		nickname: '' },
    { id: 5025, 		room_no: 6, 		checkpoint_id: 508, 		debug_id: 'd-05', 		nickname: '' },
    

    // 5C //
    


    // Chapter 6
    // 6A //
    { id: 6001, 		room_no: 1, 		checkpoint_id: 600, 		debug_id: 'start', 		nickname: '' },

    { id: 6002, 		room_no: 2, 		checkpoint_id: 601, 		debug_id: '00', 		nickname: '' },
    { id: 6003, 		room_no: 3, 		checkpoint_id: 601, 		debug_id: '01', 		nickname: '' },
    { id: 6004, 		room_no: 4, 		checkpoint_id: 601, 		debug_id: '02', 		nickname: '' },
    { id: 6005, 		room_no: 5, 		checkpoint_id: 601, 		debug_id: '03', 		nickname: '' },
    { id: 6006, 		room_no: 6, 		checkpoint_id: 601, 		debug_id: '02b', 		nickname: '' },

    { id: 6007, 		room_no: 7, 		checkpoint_id: 602, 		debug_id: '04', 		nickname: '' },
    { id: 6008, 		room_no: 8, 		checkpoint_id: 602, 		debug_id: '04b', 		nickname: '' },
    { id: 6009, 		room_no: 9, 		checkpoint_id: 602, 		debug_id: '04c', 		nickname: '' },
    { id: 6010, 		room_no: 10, 		checkpoint_id: 602,     debug_id: '04d', 		nickname: '' },
    { id: 6011, 		room_no: 1, 		checkpoint_id: 602, 		debug_id: '04e', 		nickname: '' },
    { id: 6012, 		room_no: 2, 		checkpoint_id: 602, 		debug_id: '05', 		nickname: '' },
    { id: 6013, 		room_no: 3, 		checkpoint_id: 602, 		debug_id: '06', 		nickname: '' },
    { id: 6014, 		room_no: 4, 		checkpoint_id: 602, 		debug_id: '07', 		nickname: '' },
    { id: 6015, 		room_no: 5, 		checkpoint_id: 602, 		debug_id: '08a', 		nickname: '' },
    { id: 6016, 		room_no: 6, 		checkpoint_id: 602, 		debug_id: '08b', 		nickname: '' },
    { id: 6017, 		room_no: 7, 		checkpoint_id: 602, 		debug_id: '09', 		nickname: '' },
    { id: 6018, 		room_no: 8, 		checkpoint_id: 602, 		debug_id: '10a', 		nickname: '' },
    { id: 6019, 		room_no: 9, 		checkpoint_id: 602, 		debug_id: '10b', 		nickname: '' },
    { id: 6020, 		room_no: 10, 		checkpoint_id: 602, 		debug_id: '11', 		nickname: '' },
    { id: 6021, 		room_no: 11, 		checkpoint_id: 602, 		debug_id: '12a', 		nickname: '' },
    { id: 6022, 		room_no: 12, 		checkpoint_id: 602, 		debug_id: '12b', 		nickname: '' },
    { id: 6023, 		room_no: 13, 		checkpoint_id: 602, 		debug_id: '13', 		nickname: '' },
    { id: 6024, 		room_no: 14, 		checkpoint_id: 602, 		debug_id: '14a', 		nickname: '' },
    { id: 6025, 		room_no: 1, 		checkpoint_id: 602, 		debug_id: '14b', 		nickname: '' },
    { id: 6026, 		room_no: 2, 		checkpoint_id: 602, 		debug_id: '15', 		nickname: '' },
    { id: 6027, 		room_no: 3, 		checkpoint_id: 602, 		debug_id: '16a', 		nickname: '' },
    { id: 6028, 		room_no: 4, 		checkpoint_id: 602, 		debug_id: '16b', 		nickname: '' },
    { id: 6029, 		room_no: 5, 		checkpoint_id: 602, 		debug_id: '17', 		nickname: '' },
    { id: 6030, 		room_no: 6, 		checkpoint_id: 602, 		debug_id: '18a', 		nickname: '' },
    { id: 6031, 		room_no: 7, 		checkpoint_id: 602, 		debug_id: '18b', 		nickname: '' },
    { id: 6032, 		room_no: 8, 		checkpoint_id: 602, 		debug_id: '19', 		nickname: '' },
    { id: 6033, 		room_no: 9, 		checkpoint_id: 602, 		debug_id: '20', 		nickname: '' },
    { id: 6034, 		room_no: 10, 		checkpoint_id: 602, 	  debug_id: 'b-00', 	nickname: '' },

    { id: 6035, 		room_no: 11, 		checkpoint_id: 603, 		debug_id: 'b-00b', 		nickname: '' },
    { id: 6036, 		room_no: 12, 		checkpoint_id: 603, 		debug_id: 'b-00c', 		nickname: '' },
    { id: 6037, 		room_no: 13, 		checkpoint_id: 603, 		debug_id: 'b-01', 		nickname: '' },
    { id: 6038, 		room_no: 14, 		checkpoint_id: 603, 		debug_id: 'b-02', 		nickname: '' },
    { id: 6039, 		room_no: 1, 		checkpoint_id: 603, 		debug_id: 'b-02b', 		nickname: '' },
    { id: 6040, 		room_no: 2, 		checkpoint_id: 603, 		debug_id: 'b-03', 		nickname: '' },

    { id: 6041, 		room_no: 3, 		checkpoint_id: 604, 		debug_id: 'boss-00', 		nickname: '' },
    { id: 6042, 		room_no: 4, 		checkpoint_id: 604, 		debug_id: 'boss-01', 		nickname: '' },
    { id: 6043, 		room_no: 5, 		checkpoint_id: 604, 		debug_id: 'boss-02', 		nickname: '' },
    { id: 6044, 		room_no: 6, 		checkpoint_id: 604, 		debug_id: 'boss-03', 		nickname: '' },
    { id: 6045, 		room_no: 7, 		checkpoint_id: 604, 		debug_id: 'boss-04', 		nickname: '' },
    { id: 6046, 		room_no: 8, 		checkpoint_id: 604, 		debug_id: 'boss-05', 		nickname: '' },
    { id: 6047, 		room_no: 9, 		checkpoint_id: 604, 		debug_id: 'boss-06', 		nickname: '' },
    { id: 6048, 		room_no: 10, 		checkpoint_id: 604, 		debug_id: 'boss-07', 		nickname: '' },
    { id: 6049, 		room_no: 11, 		checkpoint_id: 604, 		debug_id: 'boss-08', 		nickname: '' },
    { id: 6050, 		room_no: 12, 		checkpoint_id: 604, 		debug_id: 'boss-09', 		nickname: '' },
    { id: 6051, 		room_no: 13, 		checkpoint_id: 604, 		debug_id: 'boss-10', 		nickname: '' },
    { id: 6052, 		room_no: 14, 		checkpoint_id: 604, 		debug_id: 'boss-11', 		nickname: '' },
    { id: 6053, 		room_no: 15, 		checkpoint_id: 604, 		debug_id: 'boss-12', 		nickname: '' },
    { id: 6054, 		room_no: 16, 		checkpoint_id: 604, 		debug_id: 'boss-13', 		nickname: '' },
    { id: 6055, 		room_no: 17, 		checkpoint_id: 604, 		debug_id: 'boss-14', 		nickname: '' },
    { id: 6056, 		room_no: 18, 		checkpoint_id: 604, 		debug_id: 'boss-15', 		nickname: '' },
    { id: 6057, 		room_no: 1, 		checkpoint_id: 604, 		debug_id: 'boss-16', 		nickname: '' },
    { id: 6058, 		room_no: 2, 		checkpoint_id: 604, 		debug_id: 'boss-17', 		nickname: '' },
    { id: 6059, 		room_no: 3, 		checkpoint_id: 604, 		debug_id: 'boss-18', 		nickname: '' },
    { id: 6060, 		room_no: 4, 		checkpoint_id: 604, 		debug_id: 'boss-19', 		nickname: '' },
    { id: 6061, 		room_no: 5, 		checkpoint_id: 604, 		debug_id: 'boss-20', 		nickname: '' },

    { id: 6062, 		room_no: 6, 		checkpoint_id: 605, 		debug_id: 'after-01', 		nickname: '' },
    { id: 6063, 		room_no: 7, 		checkpoint_id: 605, 		debug_id: 'after-02', 		nickname: '' },
    { id: 6064, 		room_no: 8, 		checkpoint_id: 605, 		debug_id: 'after-03', 		nickname: '' },


    // 6B //
    { id: 6001, 		room_no: 1, 		checkpoint_id: 606, 		debug_id: 'a-00', 	  nickname: '' },
    { id: 6002, 		room_no: 2, 		checkpoint_id: 606, 		debug_id: 'a-01', 		nickname: '' },
    { id: 6003, 		room_no: 3, 		checkpoint_id: 606, 		debug_id: 'a-02', 		nickname: '' },
    { id: 6004, 		room_no: 4, 		checkpoint_id: 606, 		debug_id: 'a-03', 		nickname: '' },
    { id: 6005, 		room_no: 5, 		checkpoint_id: 606, 		debug_id: 'a-04', 		nickname: '' },
    { id: 6006, 		room_no: 6, 		checkpoint_id: 606, 		debug_id: 'a-05', 		nickname: '' },
    { id: 6007, 		room_no: 7, 		checkpoint_id: 606, 		debug_id: 'a-06', 		nickname: '' },

    { id: 6008, 		room_no: 1, 		checkpoint_id: 607, 		debug_id: 'b-00', 		nickname: '' },
    { id: 6009, 		room_no: 2, 		checkpoint_id: 607, 		debug_id: 'b-01', 		nickname: '' },
    { id: 6010, 		room_no: 3, 		checkpoint_id: 607,     debug_id: 'b-02', 		nickname: '' },
    { id: 6011, 		room_no: 4, 		checkpoint_id: 607, 		debug_id: 'b-03', 		nickname: '' },
    { id: 6012, 		room_no: 5, 		checkpoint_id: 607, 		debug_id: 'b-04', 		nickname: '' },
    { id: 6013, 		room_no: 6, 		checkpoint_id: 607, 		debug_id: 'b-05', 		nickname: '' },
    { id: 6014, 		room_no: 7, 		checkpoint_id: 607, 		debug_id: 'b-06', 		nickname: '' },
    { id: 6015, 		room_no: 8, 		checkpoint_id: 607, 		debug_id: 'b-07', 		nickname: '' },
    { id: 6016, 		room_no: 9, 		checkpoint_id: 607, 		debug_id: 'b-08', 		nickname: '' },
    { id: 6017, 		room_no: 10, 		checkpoint_id: 607, 		debug_id: 'b-10', 		nickname: '' },

    { id: 6018, 		room_no: 1, 		checkpoint_id: 608, 		debug_id: 'c-00', 		nickname: '' },
    { id: 6019, 		room_no: 2, 		checkpoint_id: 608, 		debug_id: 'c-01', 		nickname: '' },
    { id: 6020, 		room_no: 3, 		checkpoint_id: 608, 		debug_id: 'c-02', 		nickname: '' },
    { id: 6021, 		room_no: 4, 		checkpoint_id: 608, 		debug_id: 'c-03', 		nickname: '' },
    { id: 6022, 		room_no: 5, 		checkpoint_id: 608, 		debug_id: 'c-04', 		nickname: '' },

    { id: 6023, 		room_no: 1, 		checkpoint_id: 609, 		debug_id: 'd-00', 		nickname: '' },
    { id: 6024, 		room_no: 2, 		checkpoint_id: 609, 		debug_id: 'd-01', 		nickname: '' },
    { id: 6025, 		room_no: 3, 		checkpoint_id: 609, 		debug_id: 'd-02', 		nickname: '' },
    { id: 6026, 		room_no: 4, 		checkpoint_id: 609, 		debug_id: 'd-03', 		nickname: '' },
    { id: 6027, 		room_no: 5, 		checkpoint_id: 609, 		debug_id: 'd-04', 		nickname: '' },
    { id: 6028, 		room_no: 6, 		checkpoint_id: 609, 		debug_id: 'd-05', 		nickname: '' },
    
    // 6C //



    // Chapter 7
    // 7A side
    { id: 7001, 		room_no: 1, 		checkpoint_id: 700, 		debug_id: 'a-00-intro', nickname: '' },
    { id: 7002, 		room_no: 2, 		checkpoint_id: 700, 		debug_id: 'a-00', 		nickname: '' },
    { id: 7003, 		room_no: 3, 		checkpoint_id: 700, 		debug_id: 'a-01', 		nickname: '' },
    { id: 7004, 		room_no: 4, 		checkpoint_id: 700, 		debug_id: 'a-02', 		nickname: '' },
    { id: 7005, 		room_no: 5, 		checkpoint_id: 700, 		debug_id: 'a-02b', 		nickname: '' },
    { id: 7006, 		room_no: 6, 		checkpoint_id: 700, 		debug_id: 'a-03', 		nickname: '' },
    { id: 7007, 		room_no: 7, 		checkpoint_id: 700, 		debug_id: 'a-04', 		nickname: '' },
    { id: 7008, 		room_no: 8, 		checkpoint_id: 700, 		debug_id: 'a-04b', 		nickname: '' },
    { id: 7009, 		room_no: 9, 		checkpoint_id: 700, 		debug_id: 'a-05', 		nickname: '' },
    { id: 7010, 		room_no: 10, 		checkpoint_id: 700, 		debug_id: 'a-06', 		nickname: '' },

    { id: 7011, 		room_no: 1, 		checkpoint_id: 701, 		debug_id: 'b-00', 		nickname: '' },
    { id: 7012, 		room_no: 2, 		checkpoint_id: 701, 		debug_id: 'b-01', 		nickname: '' },
    { id: 7013, 		room_no: 3, 		checkpoint_id: 701, 		debug_id: 'b-02', 		nickname: '' },
    { id: 7014, 		room_no: 4, 		checkpoint_id: 701, 		debug_id: 'b-02b', 		nickname: '' },
    { id: 7015, 		room_no: 5, 		checkpoint_id: 701, 		debug_id: 'b-02c', 		nickname: '' },
    { id: 7016, 		room_no: 6, 		checkpoint_id: 701, 		debug_id: 'b-02d', 		nickname: '' },
    { id: 7017, 		room_no: 7, 		checkpoint_id: 701, 		debug_id: 'b-02e', 		nickname: '' },
    { id: 7018, 		room_no: 8, 		checkpoint_id: 701, 		debug_id: 'b-03', 		nickname: '' },
    { id: 7019, 		room_no: 9, 		checkpoint_id: 701, 		debug_id: 'b-04', 		nickname: '' },
    { id: 7020, 		room_no: 10, 		checkpoint_id: 701, 		debug_id: 'b-05', 		nickname: '' },
    { id: 7021, 		room_no: 11, 		checkpoint_id: 701, 		debug_id: 'b-06', 		nickname: '' },
    { id: 7022, 		room_no: 12, 		checkpoint_id: 701, 		debug_id: 'b-07', 		nickname: '' },
    { id: 7023, 		room_no: 13, 		checkpoint_id: 701, 		debug_id: 'b-08', 		nickname: '' },
    { id: 7024, 		room_no: 14, 		checkpoint_id: 701, 		debug_id: 'b-09', 		nickname: '' },

    { id: 7025, 		room_no: 1, 		checkpoint_id: 702, 		debug_id: 'c-00', 		nickname: '' },
    { id: 7026, 		room_no: 2, 		checkpoint_id: 702, 		debug_id: 'c-01', 		nickname: '' },
    { id: 7027, 		room_no: 3, 		checkpoint_id: 702, 		debug_id: 'c-02', 		nickname: '' },
    { id: 7028, 		room_no: 4, 		checkpoint_id: 702, 		debug_id: 'c-03', 		nickname: '' },
    { id: 7029, 		room_no: 5, 		checkpoint_id: 702, 		debug_id: 'c-03b', 		nickname: '' },
    { id: 7030, 		room_no: 6, 		checkpoint_id: 702, 		debug_id: 'c-04', 		nickname: '' },
    { id: 7031, 		room_no: 7, 		checkpoint_id: 702, 		debug_id: 'c-05', 		nickname: '' },
    { id: 7032, 		room_no: 8, 		checkpoint_id: 702, 		debug_id: 'c-06', 		nickname: '' },
    { id: 7033, 		room_no: 9, 		checkpoint_id: 702, 		debug_id: 'c-06b', 		nickname: '' },
    { id: 7034, 		room_no: 10, 		checkpoint_id: 702, 		debug_id: 'c-06c', 		nickname: '' },
    { id: 7035, 		room_no: 11, 		checkpoint_id: 702, 		debug_id: 'dc-07', 		nickname: '' },
    { id: 7036, 		room_no: 12, 		checkpoint_id: 702, 		debug_id: 'dc-07b', 	nickname: '' },
    { id: 7037, 		room_no: 13, 		checkpoint_id: 702, 		debug_id: 'c-08', 		nickname: '' },
    { id: 7038, 		room_no: 14, 		checkpoint_id: 702, 		debug_id: 'c-09', 		nickname: '' },

    { id: 7039, 		room_no: 1, 		checkpoint_id: 703, 		debug_id: 'd-00', 		nickname: '' },
    { id: 7040, 		room_no: 2, 		checkpoint_id: 703, 		debug_id: 'd-01', 		nickname: '' },
    { id: 7041, 		room_no: 3, 		checkpoint_id: 703, 		debug_id: 'd-01b', 		nickname: '' },
    { id: 7042, 		room_no: 4, 		checkpoint_id: 703, 		debug_id: 'd-01c', 		nickname: '' },
    { id: 7043, 		room_no: 5, 		checkpoint_id: 703, 		debug_id: 'd-01d', 		nickname: '' },
    { id: 7044, 		room_no: 6, 		checkpoint_id: 703, 		debug_id: 'd-02', 		nickname: '' },
    { id: 7045, 		room_no: 7, 		checkpoint_id: 703, 		debug_id: 'd-03', 		nickname: '' },
    { id: 7046, 		room_no: 8, 		checkpoint_id: 703, 		debug_id: 'd-03b', 		nickname: '' },
    { id: 7047, 		room_no: 9, 		checkpoint_id: 703, 		debug_id: 'd-04', 		nickname: '' },
    { id: 7048, 		room_no: 10, 		checkpoint_id: 703, 		debug_id: 'd-05', 		nickname: '' },
    { id: 7049, 		room_no: 11, 		checkpoint_id: 703, 		debug_id: 'd-05b', 		nickname: '' },
    { id: 7050, 		room_no: 12, 		checkpoint_id: 703, 		debug_id: 'd-06', 		nickname: '' },
    { id: 7051, 		room_no: 13, 		checkpoint_id: 703, 		debug_id: 'd-07', 		nickname: '' },
    { id: 7052, 		room_no: 14, 		checkpoint_id: 703, 		debug_id: 'd-08', 		nickname: '' },
    { id: 7053, 		room_no: 15, 		checkpoint_id: 703, 		debug_id: 'd-09', 		nickname: '' },
    { id: 7054, 		room_no: 16, 		checkpoint_id: 703, 		debug_id: 'd-10', 		nickname: '' },
    { id: 7055, 		room_no: 17, 		checkpoint_id: 703, 		debug_id: 'd-10b', 		nickname: '' },
    { id: 7056, 		room_no: 18, 		checkpoint_id: 703, 		debug_id: 'd-11', 		nickname: '' },
    
    { id: 7057, 		room_no: 1, 		checkpoint_id: 704, 		debug_id: 'e-00b', 		nickname: '' },
    { id: 7058, 		room_no: 2, 		checkpoint_id: 704, 		debug_id: 'e-00', 		nickname: '' },
    { id: 7059, 		room_no: 3, 		checkpoint_id: 704, 		debug_id: 'e-01', 		nickname: '' },
    { id: 7060, 		room_no: 4, 		checkpoint_id: 704, 		debug_id: 'e-01b', 		nickname: '' },
    { id: 7061, 		room_no: 5, 		checkpoint_id: 704, 		debug_id: 'e-01c', 		nickname: '' },
    { id: 7062, 		room_no: 6, 		checkpoint_id: 704, 		debug_id: 'e-02', 		nickname: '' },
    { id: 7063, 		room_no: 7, 		checkpoint_id: 704, 		debug_id: 'e-03', 		nickname: '' },
    { id: 7064, 		room_no: 8, 		checkpoint_id: 704, 		debug_id: 'e-04', 		nickname: '' },
    { id: 7065, 		room_no: 9, 		checkpoint_id: 704, 		debug_id: 'e-05', 		nickname: '' },
    { id: 7066, 		room_no: 10, 		checkpoint_id: 704, 		debug_id: 'e-06', 		nickname: '' },
    { id: 7067, 		room_no: 11, 		checkpoint_id: 704, 		debug_id: 'e-07', 		nickname: '' },
    { id: 7068, 		room_no: 12, 		checkpoint_id: 704, 		debug_id: 'e-08', 		nickname: '' },
    { id: 7069, 		room_no: 13, 		checkpoint_id: 704, 		debug_id: 'e-09', 		nickname: '' },
    { id: 7070, 		room_no: 14, 		checkpoint_id: 704, 		debug_id: 'e-10', 		nickname: '' },
    { id: 7071, 		room_no: 15, 		checkpoint_id: 704, 		debug_id: 'e-11', 		nickname: '' },
    { id: 7072, 		room_no: 16, 		checkpoint_id: 704, 		debug_id: 'e-12', 		nickname: '' },
    { id: 7073, 		room_no: 17, 		checkpoint_id: 704, 		debug_id: 'e-13', 		nickname: '' },

    { id: 7074, 		room_no: 1, 		checkpoint_id: 705, 		debug_id: 'f-00', 		nickname: '' },
    { id: 7075, 		room_no: 2, 		checkpoint_id: 705, 		debug_id: 'f-01', 		nickname: '' },
    { id: 7076, 		room_no: 3, 		checkpoint_id: 705, 		debug_id: 'f-02', 		nickname: '' },
    { id: 7077, 		room_no: 4, 		checkpoint_id: 705, 		debug_id: 'f-02b', 		nickname: '' },
    { id: 7078, 		room_no: 5, 		checkpoint_id: 705, 		debug_id: 'f-04', 		nickname: '' },
    { id: 7079, 		room_no: 6, 		checkpoint_id: 705, 		debug_id: 'f-03', 		nickname: '' },
    { id: 7080, 		room_no: 7, 		checkpoint_id: 705, 		debug_id: 'f-05', 		nickname: '' },
    { id: 7081, 		room_no: 8, 		checkpoint_id: 705, 		debug_id: 'f-06', 		nickname: '' },
    { id: 7082, 		room_no: 9, 		checkpoint_id: 705, 		debug_id: 'f-07', 		nickname: '' },
    { id: 7083, 		room_no: 10, 		checkpoint_id: 705, 		debug_id: 'f-08', 		nickname: '' },
    { id: 7084, 		room_no: 11, 		checkpoint_id: 705, 		debug_id: 'f-08b', 		nickname: '' },
    { id: 7085, 		room_no: 12, 		checkpoint_id: 705, 		debug_id: 'f-08d', 		nickname: '' },
    { id: 7086, 		room_no: 13, 		checkpoint_id: 705, 		debug_id: 'f-08c', 		nickname: '' },
    { id: 7087, 		room_no: 14, 		checkpoint_id: 705, 		debug_id: 'f-09', 		nickname: '' },
    { id: 7088, 		room_no: 15, 		checkpoint_id: 705, 		debug_id: 'f-10', 		nickname: '' },
    { id: 7089, 		room_no: 16, 		checkpoint_id: 705, 		debug_id: 'f-10b', 		nickname: '' },
    { id: 7090, 		room_no: 17, 		checkpoint_id: 705, 		debug_id: 'f-11', 		nickname: '' },

    { id: 7091, 		room_no: 1, 		checkpoint_id: 706, 		debug_id: 'g-00', 		nickname: '' },
    { id: 7092, 		room_no: 2, 		checkpoint_id: 706, 		debug_id: 'g-00b', 		nickname: '' },
    { id: 7093, 		room_no: 3, 		checkpoint_id: 706, 		debug_id: 'g-01', 		nickname: '' },
    { id: 7094, 		room_no: 4, 		checkpoint_id: 706, 		debug_id: 'g-02', 		nickname: '' },
    { id: 7095, 		room_no: 5, 		checkpoint_id: 706, 		debug_id: 'g-03', 		nickname: '' },


    // TODO: Number rooms, 		ids and split rooms
    // 7B //
    { id: 7001, 		room_no: 1, 		checkpoint_id: 707, 		debug_id: 'a-00-intro',   nickname: '' },
    { id: 7002, 		room_no: 2, 		checkpoint_id: 707, 		debug_id: 'a-00', 		    nickname: '' },
    { id: 7003, 		room_no: 3, 		checkpoint_id: 707, 		debug_id: 'a-01', 		    nickname: '' },
    { id: 7004, 		room_no: 4, 		checkpoint_id: 707, 		debug_id: 'a-02', 		    nickname: '' },
    { id: 7005, 		room_no: 5, 		checkpoint_id: 707, 		debug_id: 'a-03', 		    nickname: '' },

    { id: 7006, 		room_no: 1, 		checkpoint_id: 708, 		debug_id: 'b-00', 		nickname: '' },
    { id: 7007, 		room_no: 2, 		checkpoint_id: 708, 		debug_id: 'b-01', 		nickname: '' },
    { id: 7008, 		room_no: 3, 		checkpoint_id: 708, 		debug_id: 'b-02', 		nickname: '' },
    { id: 7009, 		room_no: 4, 		checkpoint_id: 708, 		debug_id: 'b-03', 		nickname: '' },

    { id: 7010, 		room_no: 1, 		checkpoint_id: 709, 		debug_id: 'c-01', 		nickname: '' },
    { id: 7011, 		room_no: 2, 		checkpoint_id: 709, 		debug_id: 'c-00', 		nickname: '' },
    { id: 7012, 		room_no: 3, 		checkpoint_id: 709, 		debug_id: 'c-02', 		nickname: '' },
    { id: 7013, 		room_no: 4, 		checkpoint_id: 709, 		debug_id: 'c-03', 		nickname: '' },

    { id: 7014, 		room_no: 1, 		checkpoint_id: 710, 		debug_id: 'd-00', 		nickname: '' },
    { id: 7015, 		room_no: 2, 		checkpoint_id: 710, 		debug_id: 'd-01', 		nickname: '' },
    { id: 7016, 		room_no: 3, 		checkpoint_id: 710, 		debug_id: 'd-02', 		nickname: '' },
    { id: 7017, 		room_no: 4, 		checkpoint_id: 710, 		debug_id: 'd-03', 		nickname: '' },

    { id: 7018, 		room_no: 1, 		checkpoint_id: 711, 		debug_id: 'e-00', 		nickname: '' },
    { id: 7019, 		room_no: 2, 		checkpoint_id: 711, 		debug_id: 'e-01', 		nickname: '' },
    { id: 7020, 		room_no: 3, 		checkpoint_id: 711, 		debug_id: 'e-02', 		nickname: '' },
    { id: 7021, 		room_no: 4, 		checkpoint_id: 711, 		debug_id: 'e-03', 		nickname: '' },

    { id: 7022, 		room_no: 1, 		checkpoint_id: 712, 		debug_id: 'f-00', 		nickname: '' },
    { id: 7023, 		room_no: 2, 		checkpoint_id: 712, 		debug_id: 'f-01', 		nickname: '' },
    { id: 7024, 		room_no: 3, 		checkpoint_id: 712, 		debug_id: 'f-02', 		nickname: '' },
    { id: 7025, 		room_no: 4, 		checkpoint_id: 712, 		debug_id: 'f-03', 		nickname: '' },
    // TODO: Split by flag
    { id: 7026, 		room_no: 1, 		checkpoint_id: 713, 		debug_id: 'g-00', 		nickname: '' },
    { id: 7027, 		room_no: 2, 		checkpoint_id: 713, 		debug_id: 'g-01', 		nickname: '' },
    { id: 7028, 		room_no: 3, 		checkpoint_id: 713, 		debug_id: 'g-02', 		nickname: '' },
    { id: 7029, 		room_no: 4, 		checkpoint_id: 713, 		debug_id: 'g-03', 		nickname: '' },

    // 7C //



    // Epilogue //



    // Chapter 8
    // 8A //
    { id: 8001, 		room_no: 1, 		checkpoint_id: 800, 		debug_id: '0x', 	  	nickname: '' },
    { id: 8002, 		room_no: 2, 		checkpoint_id: 800, 		debug_id: '00', 	  	nickname: '' },
    { id: 8003, 		room_no: 3, 		checkpoint_id: 800, 		debug_id: '01', 	  	nickname: '' },
    { id: 8004, 		room_no: 4, 		checkpoint_id: 800, 		debug_id: '02', 	  	nickname: '' },

    { id: 8005, 		room_no: 1, 		checkpoint_id: 801, 		debug_id: 'a-00', 		nickname: '' },
    { id: 8006, 		room_no: 2, 		checkpoint_id: 801, 		debug_id: 'a-01', 		nickname: '' },
    { id: 8007, 		room_no: 3, 		checkpoint_id: 801, 		debug_id: 'a-02', 		nickname: '' },
    { id: 8008, 		room_no: 4, 		checkpoint_id: 801, 		debug_id: 'a-03', 		nickname: '' },
    { id: 8009, 		room_no: 5, 		checkpoint_id: 801, 		debug_id: 'b-00', 		nickname: '' },
    { id: 8010, 		room_no: 6, 		checkpoint_id: 801, 		debug_id: 'b-01', 		nickname: '' },
    { id: 8011, 		room_no: 7, 		checkpoint_id: 801, 		debug_id: 'b-02', 		nickname: '' },
    { id: 8012, 		room_no: 8, 		checkpoint_id: 801, 		debug_id: 'b-03', 		nickname: '' },
    { id: 8013, 		room_no: 9, 		checkpoint_id: 801, 		debug_id: 'b-04', 		nickname: '' },
    { id: 8014, 		room_no: 10, 		checkpoint_id: 801, 		debug_id: 'b-05', 		nickname: '' },
    { id: 8015, 		room_no: 11, 		checkpoint_id: 801, 		debug_id: 'b-06', 		nickname: '' },
    { id: 8016, 		room_no: 12, 		checkpoint_id: 801, 		debug_id: 'b-07b', 		nickname: '' },
    { id: 8017, 		room_no: 13, 		checkpoint_id: 801, 		debug_id: 'b-07', 		nickname: '' },

    { id: 8018, 		room_no: 1, 		checkpoint_id: 802, 		debug_id: 'c-00', 		nickname: '' },
    { id: 8019, 		room_no: 2, 		checkpoint_id: 802, 		debug_id: 'c-00b', 		nickname: '' },
    { id: 8020, 		room_no: 3, 		checkpoint_id: 802, 		debug_id: 'c-01', 		nickname: '' },
    { id: 8021, 		room_no: 4, 		checkpoint_id: 802, 		debug_id: 'c-02', 		nickname: '' },
    { id: 8022, 		room_no: 5, 		checkpoint_id: 802, 		debug_id: 'c-03', 		nickname: '' },
    { id: 8023, 		room_no: 6, 		checkpoint_id: 802, 		debug_id: 'c-03b', 		nickname: '' },
    { id: 8024, 		room_no: 7, 		checkpoint_id: 802, 		debug_id: 'c-04', 		nickname: '' },

    { id: 8025, 		room_no: 1, 		checkpoint_id: 803, 		debug_id: 'd-00', 		nickname: '' },
    { id: 8026, 		room_no: 2, 		checkpoint_id: 803, 		debug_id: 'd-01', 		nickname: '' },
    { id: 8027, 		room_no: 3, 		checkpoint_id: 803, 		debug_id: 'd-02', 		nickname: '' },
    { id: 8028, 		room_no: 4, 		checkpoint_id: 803, 		debug_id: 'd-03', 		nickname: '' },
    { id: 8029, 		room_no: 5, 		checkpoint_id: 803, 		debug_id: 'd-04', 		nickname: '' },
    { id: 8030, 		room_no: 6, 		checkpoint_id: 803, 		debug_id: 'd-05', 		nickname: '' },
    { id: 8031, 		room_no: 7, 		checkpoint_id: 803, 		debug_id: 'd-06', 		nickname: '' },
    { id: 8032, 		room_no: 8, 		checkpoint_id: 803, 		debug_id: 'd-07', 		nickname: '' },
    { id: 8033, 		room_no: 9, 		checkpoint_id: 803, 		debug_id: 'd-08', 		nickname: '' },
    { id: 8034, 		room_no: 10, 		checkpoint_id: 803, 		debug_id: 'd-09', 		nickname: '' },
    { id: 8035, 		room_no: 11, 		checkpoint_id: 803, 		debug_id: 'd-10', 		nickname: '' },
    { id: 8036, 		room_no: 12, 		checkpoint_id: 803, 		debug_id: 'd-10b', 		nickname: '' },
    { id: 8037, 		room_no: 13, 		checkpoint_id: 803, 		debug_id: 'd-10c', 		nickname: '' },
    { id: 8038, 		room_no: 14, 		checkpoint_id: 803, 		debug_id: 'd-11', 		nickname: '' },
    { id: 8039, 		room_no: 15, 		checkpoint_id: 803, 		debug_id: 'space', 		nickname: '' },


    // 8B //

    // { id: 804, 		side_id: 81, 		checkpoint_no: 1, 		name: 'Start', 		abbreviation: 'ST' },
    // { id: 805, 		side_id: 81, 		checkpoint_no: 2, 		name: 'Into the Core', 		abbreviation: 'ITC' },
    // { id: 806, 		side_id: 81, 		checkpoint_no: 3, 		name: 'Burning or Freezing', 		abbreviation: 'BOF' },
    // { id: 807, 		side_id: 81, 		checkpoint_no: 4, 		name: 'Heartbeat', 		abbreviation: 'HB' },
    // // C side
    // { id: 808, 		side_id: 82, 		checkpoint_no: 1 },



    
    // 8C //

    


    // Chapter 9 //
    // 9A Start //
    { id: 9001, 		room_no: 1, 		checkpoint_id: 900, 		debug_id: 'intro-00-past', 		  nickname: '' },
    { id: 9002, 		room_no: 2, 		checkpoint_id: 900, 		debug_id: 'intro-01-future', 		nickname: '' },
    { id: 9003, 		room_no: 3, 		checkpoint_id: 900, 		debug_id: 'intro-02-launch', 		nickname: '' },
    { id: 9004, 		room_no: 4, 		checkpoint_id: 900, 		debug_id: 'intro-03-space', 		nickname: '' },
    // 9A Singular //
    { id: 9005, 		room_no: 1, 		checkpoint_id: 901, 		debug_id: 'a-00', 		nickname: '' },
    { id: 9006, 		room_no: 2, 		checkpoint_id: 901, 		debug_id: 'a-01', 		nickname: '' },
    { id: 9007, 		room_no: 3, 		checkpoint_id: 901, 		debug_id: 'a-02', 		nickname: '' },
    { id: 9008, 		room_no: 4, 		checkpoint_id: 901, 		debug_id: 'a-03', 		nickname: '' },
    { id: 9009, 		room_no: 5, 		checkpoint_id: 901, 		debug_id: 'a-04', 		nickname: '' },
    { id: 9010, 		room_no: 6, 		checkpoint_id: 901, 		debug_id: 'a-05', 		nickname: '' },
    { id: 9011, 		room_no: 7, 		checkpoint_id: 901, 		debug_id: 'b-00', 		nickname: '' },
    { id: 9012, 		room_no: 8, 		checkpoint_id: 901, 		debug_id: 'b-01', 		nickname: '' },
    { id: 9013, 		room_no: 9, 		checkpoint_id: 901, 		debug_id: 'b-02', 		nickname: '' },
    { id: 9014, 		room_no: 10, 		checkpoint_id: 901, 		debug_id: 'b-03', 		nickname: '' },
    { id: 9015, 		room_no: 11, 		checkpoint_id: 901, 		debug_id: 'b-04', 		nickname: '' },
    { id: 9016, 		room_no: 12, 		checkpoint_id: 901, 		debug_id: 'b-05', 		nickname: '' },
    { id: 9017, 		room_no: 13, 		checkpoint_id: 901, 		debug_id: 'b-06', 		nickname: '' },
    { id: 9018, 		room_no: 14, 		checkpoint_id: 901, 		debug_id: 'b-07', 		nickname: '' },
    // 9A Power Source //
    { id: 9019, 		room_no: 1, 		checkpoint_id: 902, 		debug_id: 'c-00', 		    nickname: '' },
    { id: 9020, 		room_no: 2, 		checkpoint_id: 902, 		debug_id: 'c-00-b', 		  nickname: '' },
    { id: 9021, 		room_no: 3, 		checkpoint_id: 902, 		debug_id: 'c-alt-00', 		nickname: '' },
    { id: 9022, 		room_no: 4, 		checkpoint_id: 902, 		debug_id: 'c-alt-01', 		nickname: '' },
    { id: 9023, 		room_no: 5, 		checkpoint_id: 902, 		debug_id: 'c-01', 		nickname: '' },
    { id: 9024, 		room_no: 6, 		checkpoint_id: 902, 		debug_id: 'c-02', 		nickname: '' },
    { id: 9025, 		room_no: 7, 		checkpoint_id: 902, 		debug_id: 'c-03', 		nickname: '' },
    { id: 9026, 		room_no: 8, 		checkpoint_id: 902, 		debug_id: 'd-00', 		nickname: '' },
    { id: 9027, 		room_no: 9, 		checkpoint_id: 902, 		debug_id: 'd-01', 		nickname: '' },
    { id: 9028, 		room_no: 10, 		checkpoint_id: 902, 		debug_id: 'd-02', 		nickname: '' },
    { id: 9029, 		room_no: 11, 		checkpoint_id: 902, 		debug_id: 'd-03', 		nickname: '' },
    { id: 9030, 		room_no: 12, 		checkpoint_id: 902, 		debug_id: 'd-04', 		nickname: '' },
    { id: 9031, 		room_no: 13, 		checkpoint_id: 902, 		debug_id: 'd-05', 		nickname: '' },
    { id: 9032, 		room_no: 14, 		checkpoint_id: 902, 		debug_id: 'e-00y', 		nickname: '' },
    { id: 9033, 		room_no: 15, 		checkpoint_id: 902, 		debug_id: 'e-00yb', 	nickname: '' },
    // 9A Remembered //
    { id: 9034, 		room_no: 1, 		checkpoint_id: 903, 		debug_id: 'e-00z', 		nickname: '' },
    { id: 9035, 		room_no: 2, 		checkpoint_id: 903, 		debug_id: 'e-00', 		nickname: '' },
    { id: 9036, 		room_no: 3, 		checkpoint_id: 903, 		debug_id: 'e-00b', 		nickname: '' },
    { id: 9037, 		room_no: 4, 		checkpoint_id: 903, 		debug_id: 'e-01', 		nickname: '' },
    { id: 9038, 		room_no: 5, 		checkpoint_id: 903, 		debug_id: 'e-02', 		nickname: '' },
    { id: 9039, 		room_no: 6, 		checkpoint_id: 903, 		debug_id: 'e-03', 		nickname: '' },
    { id: 9040, 		room_no: 7, 		checkpoint_id: 903, 		debug_id: 'e-04', 		nickname: '' },
    { id: 9041, 		room_no: 8, 		checkpoint_id: 903, 		debug_id: 'e-05', 		nickname: '' },
    { id: 9042, 		room_no: 9, 		checkpoint_id: 903, 		debug_id: 'e-05b', 		nickname: '' },
    { id: 9043, 		room_no: 10, 		checkpoint_id: 903, 		debug_id: 'e-05c', 		nickname: '' },
    { id: 9044, 		room_no: 11, 		checkpoint_id: 903, 		debug_id: 'e-06', 		nickname: '' },
    { id: 9045, 		room_no: 12, 		checkpoint_id: 903, 		debug_id: 'e-07', 		nickname: '' },
    { id: 9046, 		room_no: 13, 		checkpoint_id: 903, 		debug_id: 'e-08', 		nickname: '' },
    // 9A Event Horizon //
    { id: 9047, 		room_no: 1, 		checkpoint_id: 904, 		debug_id: 'f-door', 	nickname: '' },
    { id: 9048, 		room_no: 2, 		checkpoint_id: 904, 		debug_id: 'f-00', 		nickname: '' },
    { id: 9049, 		room_no: 3, 		checkpoint_id: 904, 		debug_id: 'f-01', 		nickname: '' },
    { id: 9050, 		room_no: 4, 		checkpoint_id: 904, 		debug_id: 'f-02', 		nickname: '' },
    { id: 9051, 		room_no: 5, 		checkpoint_id: 904, 		debug_id: 'f-03', 		nickname: '' },
    { id: 9052, 		room_no: 6, 		checkpoint_id: 904, 		debug_id: 'f-04', 		nickname: '' },
    { id: 9053, 		room_no: 7, 		checkpoint_id: 904, 		debug_id: 'f-05', 		nickname: '' },
    { id: 9054, 		room_no: 8, 		checkpoint_id: 904, 		debug_id: 'f-06', 		nickname: '' },
    { id: 9055, 		room_no: 9, 		checkpoint_id: 904, 		debug_id: 'f-07', 		nickname: '' },
    { id: 9056, 		room_no: 10, 		checkpoint_id: 904, 		debug_id: 'f-08', 		nickname: '' },
    { id: 9057, 		room_no: 11, 		checkpoint_id: 904, 		debug_id: 'f-09', 		nickname: '' },
    { id: 9058, 		room_no: 12, 		checkpoint_id: 904, 		debug_id: 'g-00', 		nickname: '' },
    { id: 9059, 		room_no: 13, 		checkpoint_id: 904, 		debug_id: 'g-01', 		nickname: '' },
    { id: 9060, 		room_no: 14, 		checkpoint_id: 904, 		debug_id: 'g-03', 		nickname: '' },
    { id: 9061, 		room_no: 15, 		checkpoint_id: 904, 		debug_id: 'g-02', 		nickname: '' },
    { id: 9062, 		room_no: 16, 		checkpoint_id: 904, 		debug_id: 'g-04', 		nickname: '' },
    { id: 9063, 		room_no: 17, 		checkpoint_id: 904, 		debug_id: 'g-05', 		nickname: '' },
    { id: 9064, 		room_no: 18, 		checkpoint_id: 904, 		debug_id: 'g-06', 		nickname: '' },
    // 9A Determination //
    { id: 9065, 		room_no: 1, 		checkpoint_id: 905, 		debug_id: 'h-00b', 		nickname: '' },
    { id: 9066, 		room_no: 2, 		checkpoint_id: 905, 		debug_id: 'h-00', 		nickname: '' },
    { id: 9067, 		room_no: 3, 		checkpoint_id: 905, 		debug_id: 'h-01', 		nickname: '' },
    { id: 9068, 		room_no: 4, 		checkpoint_id: 905, 		debug_id: 'h-02', 		nickname: '' },
    { id: 9069, 		room_no: 5, 		checkpoint_id: 905, 		debug_id: 'h-03', 		nickname: '' },
    { id: 9070, 		room_no: 6, 		checkpoint_id: 905, 		debug_id: 'h-03b', 		nickname: '' },
    { id: 9071, 		room_no: 7, 		checkpoint_id: 905, 		debug_id: 'h-04', 		nickname: '' },
    { id: 9072, 		room_no: 8, 		checkpoint_id: 905, 		debug_id: 'h-04b', 		nickname: '' },
    { id: 9073, 		room_no: 9, 		checkpoint_id: 905, 		debug_id: 'h-05', 		nickname: '' },
    { id: 9074, 		room_no: 10, 		checkpoint_id: 905, 		debug_id: 'h-06', 		nickname: '' },
    { id: 9075, 		room_no: 11, 		checkpoint_id: 905, 		debug_id: 'h-06b', 		nickname: '' },
    { id: 9076, 		room_no: 12, 		checkpoint_id: 905, 		debug_id: 'h-07', 		nickname: '' },
    { id: 9077, 		room_no: 13, 		checkpoint_id: 905, 		debug_id: 'h-08', 		nickname: '' },
    { id: 9078, 		room_no: 14, 		checkpoint_id: 905, 		debug_id: 'h-09', 		nickname: '' },
    { id: 9079, 		room_no: 15, 		checkpoint_id: 905, 		debug_id: 'h-10', 		nickname: '' },
    // 9A Stubbornness //
    { id: 9080, 		room_no: 1, 		checkpoint_id: 906, 		debug_id: 'i-00', 		nickname: '' },
    { id: 9081, 		room_no: 2, 		checkpoint_id: 906, 		debug_id: 'i-00b', 		nickname: '' },
    { id: 9082, 		room_no: 3, 		checkpoint_id: 906, 		debug_id: 'i-01', 		nickname: '' },
    { id: 9083, 		room_no: 4, 		checkpoint_id: 906, 		debug_id: 'i-02', 		nickname: '' },
    { id: 9084, 		room_no: 5, 		checkpoint_id: 906, 		debug_id: 'i-03', 		nickname: '' },
    { id: 9085, 		room_no: 6, 		checkpoint_id: 906, 		debug_id: 'i-04', 		nickname: '' },
    { id: 9086, 		room_no: 7, 		checkpoint_id: 906, 		debug_id: 'i-05', 		nickname: '' },
    // 9A Reconciliation //
    { id: 9087, 		room_no: 1, 		checkpoint_id: 907, 		debug_id: 'j-00', 		nickname: '' },
    { id: 9088, 		room_no: 2, 		checkpoint_id: 907, 		debug_id: 'j-00b', 		nickname: '' },
    { id: 9089, 		room_no: 3, 		checkpoint_id: 907, 		debug_id: 'j-01', 		nickname: '' },
    { id: 9090, 		room_no: 4, 		checkpoint_id: 907, 		debug_id: 'j-02', 		nickname: '' },
    { id: 9091, 		room_no: 5, 		checkpoint_id: 907, 		debug_id: 'j-03', 		nickname: '' },
    { id: 9092, 		room_no: 6, 		checkpoint_id: 907, 		debug_id: 'j-04', 		nickname: '' },
    { id: 9093, 		room_no: 7, 		checkpoint_id: 907, 		debug_id: 'j-05', 		nickname: '' },
    { id: 9094, 		room_no: 8, 		checkpoint_id: 907, 		debug_id: 'j-06', 		nickname: '' },
    { id: 9095, 		room_no: 9, 		checkpoint_id: 907, 		debug_id: 'j-07', 		nickname: '' },
    { id: 9096, 		room_no: 10, 		checkpoint_id: 907, 		debug_id: 'j-08', 		nickname: '' },
    { id: 9097, 		room_no: 11, 		checkpoint_id: 907, 		debug_id: 'j-09', 		nickname: '' },
    { id: 9098, 		room_no: 12, 		checkpoint_id: 907, 		debug_id: 'j-10', 		nickname: '' },
    { id: 9099, 		room_no: 13, 		checkpoint_id: 907, 		debug_id: 'j-11', 		nickname: '' },
    { id: 10000, 		room_no: 14, 		checkpoint_id: 907, 		debug_id: 'j-12', 		nickname: '' },
    { id: 10001, 		room_no: 15, 		checkpoint_id: 907, 		debug_id: 'j-13', 		nickname: '' },
    { id: 10002, 		room_no: 16, 		checkpoint_id: 907, 		debug_id: 'j-14', 		nickname: '' },
    { id: 10003, 		room_no: 17, 		checkpoint_id: 907, 		debug_id: 'j-14b', 		nickname: '' },
    { id: 10004, 		room_no: 18, 		checkpoint_id: 907, 		debug_id: 'j-15', 		nickname: '' },
    // 9A Farewell //
    { id: 10005, 		room_no: 1, 		checkpoint_id: 908, 		debug_id: 'j-16', 		      nickname: '' },
    { id: 10006, 		room_no: 2, 		checkpoint_id: 908, 		debug_id: 'j-17', 		      nickname: '' },
    { id: 10007, 		room_no: 3, 		checkpoint_id: 908, 		debug_id: 'j-18', 		      nickname: '' },
    { id: 10008, 		room_no: 4, 		checkpoint_id: 908, 		debug_id: 'j-19', 		      nickname: '' },
    { id: 10009, 		room_no: 5, 		checkpoint_id: 908, 		debug_id: 'end-golden', 		nickname: '' },
  ]);
}


    // // Chapter 2
    // // A side
    // { id: 200, 		side_id: 20, 		checkpoint_no: 1, 		name: 'Start', 		abbreviation: 'ST' },
    // { id: 201, 		side_id: 20, 		checkpoint_no: 2, 		name: 'Intervention', 		abbreviation: 'IV' },
    // { id: 202, 		side_id: 20, 		checkpoint_no: 3, 		name: 'Awake', 		abbreviation: 'AW' },
    // // B side
    // { id: 203, 		side_id: 21, 		checkpoint_no: 1, 		name: 'Start', 		abbreviation: 'ST' },
    // { id: 204, 		side_id: 21, 		checkpoint_no: 2, 		name: 'Combination Lock', 		abbreviation: 'CL' },
    // { id: 205, 		side_id: 21, 		checkpoint_no: 3, 		name: 'Dream Altar', 		abbreviation: 'DA' },
    // // C side
    // { id: 206, 		side_id: 22, 		checkpoint_no: 1 },

    // // Chapter 3
    // // A side
    // { id: 300, 		side_id: 30, 		checkpoint_no: 1, 		name: 'Start', 		abbreviation: 'ST' },
    // { id: 301, 		side_id: 30, 		checkpoint_no: 2, 		name: 'Huge Mess', 		abbreviation: 'HM' },
    // { id: 302, 		side_id: 30, 		checkpoint_no: 3, 		name: 'Elevator Shaft', 		abbreviation: 'ES' },
    // { id: 303, 		side_id: 30, 		checkpoint_no: 4, 		name: 'Presidential Suite', 		abbreviation: 'PS' },
    // // B side
    // { id: 304, 		side_id: 31, 		checkpoint_no: 1, 		name: 'Start', 		abbreviation: 'ST' },
    // { id: 305, 		side_id: 31, 		checkpoint_no: 2, 		name: 'Staff Quarters', 		abbreviation: 'SQ' },
    // { id: 306, 		side_id: 31, 		checkpoint_no: 3, 		name: 'Library', 		abbreviation: 'LB' },
    // { id: 307, 		side_id: 31, 		checkpoint_no: 4, 		name: 'Rooftop', 		abbreviation: 'RT' },
    // // C side
    // { id: 108, 		side_id: 32, 		checkpoint_no: 1 },

    // // Chapter 4
    // // A side
    // { id: 400, 		side_id: 40, 		checkpoint_no: 1, 		name: 'Start', 		abbreviation: 'ST' },
    // { id: 401, 		side_id: 40, 		checkpoint_no: 2, 		name: 'Shrine', 		abbreviation: 'SH' },
    // { id: 402, 		side_id: 40, 		checkpoint_no: 3, 		name: 'Old Trail', 		abbreviation: 'OT' },
    // { id: 403, 		side_id: 40, 		checkpoint_no: 4, 		name: 'Cliff Face', 		abbreviation: 'CF' },
    // // B side
    // { id: 404, 		side_id: 41, 		checkpoint_no: 1, 		name: 'Start', 		abbreviation: 'ST' },
    // { id: 405, 		side_id: 41, 		checkpoint_no: 2, 		name: 'Stepping Stones', 		abbreviation: 'SS' },
    // { id: 406, 		side_id: 41, 		checkpoint_no: 3, 		name: 'Gusty Canyon', 		abbreviation: 'GC' },
    // { id: 407, 		side_id: 41, 		checkpoint_no: 4, 		name: 'Eye of the Storm', 		abbreviation: 'EOTS' },
    // // C side
    // { id: 408, 		side_id: 42, 		checkpoint_no: 1 },

    // // Chapter 5
    // // A side
    // { id: 500, 		side_id: 50, 		checkpoint_no: 1, 		name: 'Start', 		abbreviation: 'ST' },
    // { id: 501, 		side_id: 50, 		checkpoint_no: 2, 		name: 'Depths', 		abbreviation: 'DP' },
    // { id: 502, 		side_id: 50, 		checkpoint_no: 3, 		name: 'Unravelling', 		abbreviation: 'UR' },
    // { id: 503, 		side_id: 50, 		checkpoint_no: 4, 		name: 'Search', 		abbreviation: 'SC' },
    // { id: 504, 		side_id: 50, 		checkpoint_no: 5, 		name: 'Rescue', 		abbreviation: 'RS' },
    // // B side
    // { id: 505, 		side_id: 51, 		checkpoint_no: 1, 		name: 'Start', 		abbreviation: 'ST' },
    // { id: 506, 		side_id: 51, 		checkpoint_no: 2, 		name: 'Central Chamber', 		abbreviation: 'CC' },
    // { id: 507, 		side_id: 51, 		checkpoint_no: 3, 		name: 'Through the Mirror', 		abbreviation: 'TTM' },
    // { id: 508, 		side_id: 51, 		checkpoint_no: 4, 		name: 'Mix Master', 		abbreviation: 'MM' },
    // // C side
    // { id: 509, 		side_id: 51, 		checkpoint_no: 1 },

    // // Chapter 6
    // // A side
    // { id: 600, 		side_id: 60, 		checkpoint_no: 1, 		name: 'Start', 		abbreviation: 'ST' },
    // { id: 601, 		side_id: 60, 		checkpoint_no: 2, 		name: 'Lake', 		abbreviation: 'LK' },
    // { id: 602, 		side_id: 60, 		checkpoint_no: 3, 		name: 'Hollows', 		abbreviation: 'HL' },
    // { id: 603, 		side_id: 60, 		checkpoint_no: 4, 		name: 'Reflection', 		abbreviation: 'RF' },
    // { id: 604, 		side_id: 60, 		checkpoint_no: 5, 		name: 'Rock Bottom', 		abbreviation: 'RB' },
    // { id: 605, 		side_id: 60, 		checkpoint_no: 6, 		name: 'Resolution', 		abbreviation: 'RL' },
    // // B side
    // { id: 606, 		side_id: 61, 		checkpoint_no: 1, 		name: 'Start', 		abbreviation: 'ST' },
    // { id: 607, 		side_id: 61, 		checkpoint_no: 2, 		name: 'Reflection', 		abbreviation: 'RF' },
    // { id: 608, 		side_id: 61, 		checkpoint_no: 3, 		name: 'Rock Bottom', 		abbreviation: 'RB' },
    // { id: 609, 		side_id: 61, 		checkpoint_no: 4, 		name: 'Reprieve', 		abbreviation: 'RP' },
    // // C side
    // { id: 610, 		side_id: 62, 		checkpoint_no: 1 },

    // // Chapter 7
    // // A side
    // { id: 700, 		side_id: 70, 		checkpoint_no: 1, 		name: 'Start', 		abbreviation: 'ST' },
    // { id: 701, 		side_id: 70, 		checkpoint_no: 2, 		name: '500 M', 		abbreviation: '0.5K' },
    // { id: 702, 		side_id: 70, 		checkpoint_no: 3, 		name: '1000 M', 		abbreviation: '1K' },
    // { id: 703, 		side_id: 70, 		checkpoint_no: 4, 		name: '1500 M', 		abbreviation: '1.5K' },
    // { id: 704, 		side_id: 70, 		checkpoint_no: 5, 		name: '2000 M', 		abbreviation: '2K' },
    // { id: 705, 		side_id: 70, 		checkpoint_no: 6, 		name: '2500 M', 		abbreviation: '2.5K' },
    // { id: 706, 		side_id: 70, 		checkpoint_no: 7, 		name: '3000 M', 		abbreviation: '3K' },
    // // B side
    // { id: 707, 		side_id: 71, 		checkpoint_no: 1, 		name: 'Start', 		abbreviation: 'ST' },
    // { id: 708, 		side_id: 71, 		checkpoint_no: 2, 		name: '500 M', 		abbreviation: '0.5K' },
    // { id: 709, 		side_id: 71, 		checkpoint_no: 3, 		name: '1000 M', 		abbreviation: '1K' },
    // { id: 710, 		side_id: 71, 		checkpoint_no: 4, 		name: '1500 M', 		abbreviation: '1.5K' },
    // { id: 711, 		side_id: 71, 		checkpoint_no: 5, 		name: '2000 M', 		abbreviation: '2K' },
    // { id: 712, 		side_id: 71, 		checkpoint_no: 6, 		name: '2500 M', 		abbreviation: '2.5K' },
    // { id: 713, 		side_id: 71, 		checkpoint_no: 7, 		name: '3000 M', 		abbreviation: '3K' },
    // // C side
    // { id: 714, 		side_id: 72, 		checkpoint_no: 1 },

    // // Epilogue
    // { id: 750, 		side_id: 75, 		checkpoint_no: 1 },