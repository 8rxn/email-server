const SMTPServer = require("smtp-server").SMTPServer;

const server = new SMTPServer({
  allowInsecureAuth: true,
  authOptional: true,
  onConnect(session, callback) {
    console.log("Server connected",session.id);
    callback();
  },
  onClose(session) {
    console.log("Server closed");
  },
  onMailFrom(address, session, callback) {
    console.log("Mail from:", address.address);
    callback();
  },
  onRcptTo(address, session, callback) {
    console.log("Mail to:", address.address);
    callback();
  },
  onData(stream, session, callback) {
    stream.pipe(process.stdout);
    stream.on("end", callback);
  },
});
server.listen(25)
