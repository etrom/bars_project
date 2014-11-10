var CronJob = require('cron').CronJob;
var Bar = require('../api/bar/bar.model');
var async = require('async');


// Bar.find(function (err, bars) {
//   console.log(bars);
//   if (barinterval === 7 ) {
//     var oneWeek = new CronJob('* 0-23 * * * 0-6', function(){
//         // Runs every day (sun through sat)
//         // on hours 0 - 23
//         // subtracts .6 and hour -- bar will deplete completely  in 7 days
//         // Bar.find({ _id:req.params.id},{fulfillment: req.body.fulfillment - .60 }, function(err,user) {
//       })
//       }, function () {
//         // This function is executed when the job stops
//       },
//       true /* Start the job right now */,
//       timeZone /* Time zone of this job. */
//     );
//   }
// });

///depeletes by .60 every hour === 100% depeletion in 7 days
module.exports = function() {
  var cron = new CronJob('*/60 * * * * *', function(){
    Bar.find(function (err, bars) {
      async.each(bars, function(bar, doneOneBar) {
        var interval = bar.depInterval;

        switch (interval) {
          case 7:
            var full = bar.fulfillment;
            full = full.toFixed(2);
            full -= 0.01;

            bar.fulfillment = full;
            bar.save(function(err, bar, numModified) {
              console.log(bar._id + " updated!");
            });
            break;
          case 14:
            var full = bar.fulfillment;
            full = full.toFixed(3);
            full -= 0.005;

            bar.fulfillment = full;
            bar.save(function(err, bar, numModified) {
              console.log(bar._id + " updated!");
            });
            break;
          case 1:
            var full = bar.fulfillment;
            full = full.toFixed(2);
            full -= 0.07;

            bar.fulfillment = full;
            bar.save(function(err, bar, numModified) {
              console.log(bar._id + " updated!");
            });
            break;
          case 3:
            var full = bar.fulfillment;
            full = full.toFixed(2);
            full -= 1.67;

            bar.fulfillment = full;
            bar.save(function(err, bar, numModified) {
              console.log(bar._id + " updated!");
            });
            break;
            //really fast
            case 66:
            var full = bar.fulfillment;
            full = full.toFixed(2);
            full -= 3.67;

            bar.fulfillment = full;
            bar.save(function(err, bar, numModified) {
              console.log(bar._id + " updated!");
            });
            break;
        }

      }, function(err) {

      });

      // for(var i = 0; i< bars.length; i++) {
      //   if(bars[i].depInterval === 7) {
      //     var full = bars[i].fulfillment;
      //       full = full.toFixed(2);
      //       full -= 0.01;

      //       Bar.findOneAndUpdate({ _id:bars[i]._id},{fulfillment: full}, function(err,bar) {
      //         // socket.emit('bar' + bar._id, bar);
      //       });
      //   }
      //   // two weeks
      //   if(bars[i].depInterval === 14) {
      //     var full = bars[i].fulfillment;
      //     full = full.toFixed(3);
      //     full -= .005;
      //     Bar.findOneAndUpdate({ _id:bars[i]._id},{fulfillment: full}, function(err,bar) {
      //       // socket.emit('bar' + bar._id, bar);
      //     });
      //   }
      //   //one day depletion
      //   if(bars[i].depInterval === 1) {
      //     var full = bars[i].fulfillment;
      //     full = full.toFixed(2);
      //     full -= .07;
      //     Bar.findOneAndUpdate({ _id:bars[i]._id},{fulfillment: full}, function(err,bar) {
      //       // socket.emit('bar' + bar._id, bar);
      //     });

      //   }
      //   //1 hour depletion
      //   if(bars[i].depInterval === 3) {
      //     var full = bars[i].fulfillment;
      //     full = full.toFixed(2);
      //     full -= 1.67;
      //     Bar.findOneAndUpdate({ _id:bars[i]._id},{fulfillment: full}, function(err,bar) {
      //       // socket.emit('bar' + bar._id, bar);
      //     });
      //   }
      // }
    })
  })

  cron.start();
}



