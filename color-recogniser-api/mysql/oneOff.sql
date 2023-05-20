use ColorRecogniserDB;

DELIMITER //

create procedure OneOffScript1()
begin
    if not exists (select * from `OneOffScript` where id = 1)
		and exists(select * from `User` where username = 'yen_admin')
    then
		START TRANSACTION;
        insert into `UserRole` (id, name)
        values ((select id from `User` where username = 'yen_admin')
                , 'ADMIN'
            );

        INSERT INTO `OneOffScript` (id, description) VALUES (1, 'Add admin role to yen_admin.');
        COMMIT;
    end if;

END; //

DELIMITER ;

call OneOffScript1();

drop procedure OneOffScript1;