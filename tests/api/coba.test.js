import fetch from "node-fetch"
import { expect } from "chai";
import Ajv from "ajv";
import schema_createnewuser from "../schema/reqresSchema.js";
import schema_getsingleuser from "../schema/reqresSchema2.js";
import schema_getlistuser from "../schema/reqresSchema3.js";

describe("API Tests Suite", function() {

    it("Get List User", async function () {
        //tembak url
        const hasil = await fetch('https://reqres.in/api/users?page=2')

        //validasi http harus 200
        expect(hasil.status, "ada yang salah").to.equal(200)

        const ajv = new Ajv()
        const data = await hasil.json();
        const cekcek = ajv.compile(schema_getlistuser)
        const hasil_schema = cekcek(data)

        expect(hasil_schema, 'schema is not valid').to.be.true 
    })
    
    it("Get Single User", async function () {
        //tembak url
        const hasil = await fetch('https://reqres.in/api/users/2')

        //validasi http harus 200
        expect(hasil.status, "ada yang salah").to.equal(200)

        const ajv = new Ajv()
        const data = await hasil.json();
        const cekcek = ajv.compile(schema_getsingleuser)
        const hasil_schema = cekcek(data)

        expect(hasil_schema, 'schema is not valid').to.be.true 
    })

    it("Create New User", async function () {
        const newPost = {
            name: "Morpheus",
            job: "leader"
        }

        const hasilpost = await fetch('https://reqres.in/api/users', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newPost)
        })

        expect(hasilpost.status).to.equal(201)

        const ajv = new Ajv()
        const data = await hasilpost.json();
        const cekcek = ajv.compile(schema_createnewuser)
        const hasil_schema = cekcek(data)

        expect(hasil_schema, 'schema is not valid').to.be.true  
    })
})