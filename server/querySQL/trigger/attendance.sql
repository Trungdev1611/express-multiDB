-- function trong trigger tự động tính status dựa vào checkout time
CREATE OR REPLACE FUNCTION update_attendance_status() RETURNS TRIGGER AS $$
BEGIN
-- RAise để log trigger ra console
RAISE NOTICE 'Trigger fired for record ID: %, checkOut = %, checkIn = %', NEW.id, NEW."checkOut", NEW."checkIn";
  -- Chỉ xử lý khi "checkOut" không null và khác giá trị cũ (trong UPDATE)
  IF NEW."checkOut" IS NOT NULL AND (TG_OP = 'INSERT' OR NEW."checkOut" <> OLD."checkOut") THEN
    IF NEW."checkOut" - NEW."checkIn" >= INTERVAL '8 hours' THEN
      NEW.status := 'enough';
    ELSE
      NEW.status := 'not_enough';
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER auto_update_status
BEFORE INSERT OR UPDATE ON attendance_entity
FOR EACH ROW
EXECUTE FUNCTION update_attendance_status();

-- INSERT INTO attendance_entity ("userId", "checkIn", "checkOut")
-- VALUES (97, '2025-10-25 08:00:00', '2025-10-25 19:00:00');

-- update attendance_entity at set "checkOut" = '2024-10-25 12:00:00'  WHERE at."checkIn" = '2024-10-25 08:00:00'


-- select * from attendance_entity at where extract(year FROM at."checkOut" ) = 2025 and extract(month from at."checkOut") = 10




