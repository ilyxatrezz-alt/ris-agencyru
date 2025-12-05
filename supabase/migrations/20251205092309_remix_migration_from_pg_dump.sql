CREATE EXTENSION IF NOT EXISTS "pg_graphql";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "plpgsql";
CREATE EXTENSION IF NOT EXISTS "supabase_vault";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--



--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'public'
    AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


SET default_table_access_method = heap;

--
-- Name: websites; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.websites (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    image_url text NOT NULL,
    category text NOT NULL,
    project_type text NOT NULL,
    result_description text,
    order_index integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: websites websites_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.websites
    ADD CONSTRAINT websites_pkey PRIMARY KEY (id);


--
-- Name: websites update_websites_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_websites_updated_at BEFORE UPDATE ON public.websites FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: websites Admins can delete websites; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can delete websites" ON public.websites FOR DELETE USING ((auth.uid() IS NOT NULL));


--
-- Name: websites Admins can insert websites; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can insert websites" ON public.websites FOR INSERT WITH CHECK ((auth.uid() IS NOT NULL));


--
-- Name: websites Admins can update websites; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can update websites" ON public.websites FOR UPDATE USING ((auth.uid() IS NOT NULL));


--
-- Name: websites Websites are viewable by everyone; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Websites are viewable by everyone" ON public.websites FOR SELECT USING ((is_active = true));


--
-- Name: websites; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.websites ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--


