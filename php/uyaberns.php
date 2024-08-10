<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
require 'connection.php'; 

$data = json_decode(file_get_contents('php://input'), true);

// !Kuhaon ang pangalan sa estudyante ug ang listahan sa mga uyab gikan sa input data
$stud_name = $data['stud_name'] ?? null;
$uyabs = $data['uyabs'] ?? [];

// !I-check kung ang input data kay valid
if ($stud_name === null || empty($uyabs)) {
    echo json_encode(["error" => "Invalid input data"]);
    exit;
}

try {
    //!  sugod sa transaction
    $pdo->beginTransaction();

    //! I-insert ang estudyante sa tbl_student
    $stmt = $pdo->prepare("INSERT INTO tbl_student (stud_name) VALUES (:stud_name)");
    if (!$stmt->execute(['stud_name' => $stud_name])) {
        throw new Exception("Failed to insert student: " . implode(", ", $stmt->errorInfo()));
    }
    $stud_id = $pdo->lastInsertId();

    //! I-insert ang mga uyab sa tbl_uyab
    $stmt = $pdo->prepare("INSERT INTO tbl_uyab (stud_id, uyab_name) VALUES (:stud_id, :uyab_name)");
    foreach ($uyabs as $uyab_name) {
        if (!$stmt->execute(['stud_id' => $stud_id, 'uyab_name' => $uyab_name])) {
            throw new Exception("Failed to insert uyab: " . implode(", ", $stmt->errorInfo()));
        }
    }

    //! I-commit ang transaction kung walay error
    $pdo->commit();
    echo json_encode(["success" => true]);
} catch (Exception $e) {
    //! I-roll back ang transaction kung naay error bali balik sa una
    $pdo->rollBack();
    echo json_encode(["error" => $e->getMessage()]);
}
?>