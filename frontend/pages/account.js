import Button from "@/components/Button";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Spinner from "@/components/Spinner";
import Title from "@/components/Title";
import WhiteBox from "@/components/WhiteBox";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import styled from "styled-components";

const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  margin: 40px 0;
`;
const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;
export default function AccountPage() {
  const { data: session } = useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [loaded, setLoaded] = useState(false);

  async function logout() {
    await signOut({
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  }

  async function login() {
    await signIn("google");
  }

  function saveAddress() {
    const data = { name, email, city, streetAddress, postalCode, country };
    axios.put("/api/address", data);
  }

  useEffect(() => {
    //when our app mounts do this
    axios.get("/api/address").then((res) => {
      setName(res.data.name);
      setEmail(res.data.email);
      setCity(res.data.city);
      setPostalCode(res.data.postalCode);
      setStreetAddress(res.data.streetAddress);
      setCountry(res.data.country);
      setLoaded(true);
    });
  }, []);

  return (
    <>
      <Header />
      <Center>
        <ColsWrapper>
          <div>
            <WhiteBox>
              <h2>Wish List</h2>
            </WhiteBox>
          </div>
          <div>
            <WhiteBox>
              <h2>Account Details</h2>
              {!loaded && <Spinner fullWidth={true} />}
              {loaded && (
                <>
                  <Input
                    type="text"
                    placeholder="Name"
                    value={name}
                    name="name"
                    onChange={(ev) => setName(ev.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Email"
                    value={email}
                    name="email"
                    onChange={(ev) => setEmail(ev.target.value)}
                  />
                  <CityHolder>
                    <Input
                      type="text"
                      placeholder="City"
                      value={city}
                      name="city"
                      onChange={(ev) => setCity(ev.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="Postal Code"
                      value={postalCode}
                      name="postalCode"
                      onChange={(ev) => setPostalCode(ev.target.value)}
                    />
                  </CityHolder>
                  <Input
                    type="text"
                    placeholder="Street Address"
                    value={streetAddress}
                    name="streetAddress"
                    onChange={(ev) => setStreetAddress(ev.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Country"
                    value={country}
                    name="country"
                    onChange={(ev) => setCountry(ev.target.value)}
                  />
                  <Button black block onClick={saveAddress}>
                    Save
                  </Button>
                  <hr />
                </>
              )}

              {session && (
                <Button primary={1} onClick={logout}>
                  Logout
                </Button>
              )}

              {!session && (
                <Button primary={1} onClick={login}>
                  Log in
                </Button>
              )}
            </WhiteBox>
          </div>
        </ColsWrapper>
      </Center>
    </>
  );
}
