---
title: "utPL/SQLでテストスキーマを分ける方法"
categories: 
  - "information-technology"
draft: true
---

```
-- テストスキーマを作成する。

set verify off
accept passwd prompt 'Enter password for UTP_DX3AD : ' hide

create user UTP_DX3AD identified by UTP_DX3AD
    default tablespace users
    temporary tablespace temp
    quota unlimited on users
/

grant create session, create view, create sequence, create table, create any procedure to UTP_DX3AD
/

-- テストスキーマにテスト対象スキーマの全オブジェクトに対する権限を付与する。

set serveroutput on size unlimited

declare
    l_priv varchar2(30);
begin
  DBMS_OUTPUT.ENABLE(1000000);
  dbms_output.put_line('executed grant start.');
  dbms_output.put_line('');
  
    for r_object in
    (
        select object_name, object_type
        from dba_objects
        where owner = 'DX3AD'
        and object_type in ('TABLE', 'VIEW', 'PACKAGE', 'PROCEDURE', 'FUNCTION', 'SYNONYM')
        and object_name not like 'X%'
    )
    loop
        l_priv :=
        case r_object.object_type
            when 'TABLE' then 'ALL'
            when 'PACKAGE' then 'EXECUTE'
            when 'PROCEDURE' then 'EXECUTE'
            when 'FUNCTION' then 'EXECUTE'
            else 'SELECT'
        end;
        if (r_object.object_type = 'SYNONYM' and (r_object.object_name like 'PRC_%' or r_object.object_name like 'FNC_%')) THEN
          l_priv := 'EXECUTE';
        end if;
        dbms_output.put_line('grant '||l_priv||' on DX3AD.'||r_object.object_name||' to UTP_DX3AD;');
        EXECUTE IMMEDIATE 'grant '||l_priv||' on DX3AD.'||r_object.object_name||' to UTP_DX3AD';
    end loop;

  dbms_output.put_line('');
  dbms_output.put_line('executed grant end.');
end;
/
```

https://mikesmithers.wordpress.com/2018/04/25/utplsql-3-0-how-to-have-your-cake-and-eat-it/
