import express, { request } from "express";
import { connectdb, mycoll } from "../database/db.js";
import bcrypt from "bcrypt";
import session from "express-session";
import { ObjectId } from "mongodb";

await connectdb();

export const register = (req, res) => {
  res.render("reg-page", { message: null });
};

export const login = (req, res) => {
  res.render("login-page", { message1: null });
};

export async function insertuser(req, res, next) {
  try {
    const { username, email, password1, repass } = req.body;
    let existing = mycoll.findOne({ email });
    if (!existing) {
      res.render("reg-page", { message: "email exist" });
    }
    const hashed = await bcrypt.hash(password1, 10);
    await mycoll.insertOne({
      username,
      email,
      password1: hashed,
      role: "user",
      status: "Active",
    });
    res.redirect("/login");
  } catch (error) {
    console.log(error);
    res.render("reg-page", { message: " Reg-Failed" });
  }
}

export async function finduser(req, res) {
  try {
    const { email, password } = req.body;

    const find = await mycoll.findOne({ email });
    if (!find) {
      res.render("login-page", { message1: "login-failed" });
    }
    const compare = await bcrypt.compare(password, find.password1);
    if (!compare) {
      res.render("login-page", { message1: "check password" });
    }
    req.session.user = email;
    res.redirect("/users");
  } catch (error) {
    console.log(error);
  }
}
export async function userss(req, res) {
  if (!req.session.user) {
    return res.send("not logged in");
  }
  try {
    const users = await mycoll.find().toArray();
    // console.log(users)
    res.render("Welcome", { users, answer: "Action-View" });
  } catch (error) {
    res.send(error);
  }
}

export async function enable(req, res) {
  const id = req.params.id;
  const obj = new ObjectId(id);

  const enableid = await mycoll.updateOne(
    { _id: obj },
    { $set: { status: "Active" } }
  );

  res.redirect("/users");
}
export async function disable(req, res) {
  const id = req.params.id;
  try {
    const obj = new ObjectId(id);
    const enableid = await mycoll.updateOne(
      { _id: obj },
      { $set: { status: "inactive" } }
    );
    res.redirect("/users");
    console.log("changed");
  } catch (error) {
    console.log(error);
  }
}

export function loguser(req, res) {
  req.session.destroy();
  res.send("logout");
}
